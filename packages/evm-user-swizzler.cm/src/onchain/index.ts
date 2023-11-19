import {
    toHex,
    getContextCall,
    getContractArguments,
    getContractId,
    contractIssuer,
    continueTx,
    dataVerified,
    dataUnverified,
    genericClaim,
    claimKey,
    callLegacy,
    tokenizationBlockContractId,
    getMethodArguments,
    SELF_REGISTER_HANDLER_NAME,
    getContextTx,
    executeHandler,
    NewTx,
    TxContext,
    extractDataUnverified,
    ResolvedOperation,
    addMethodHandler,
    isDataVerified,
    isResolvedData,
    ContractIssuer,
} from "@coinweb/contract-kit";
import { selfRegisterHandler } from "@coinweb/self-register";
import { BLAKE2s } from "./blake2s";

export const PROXY = "PROXY";

function hashObject(obj: any) {
    // Convert the object to a string
    const str = JSON.stringify(obj);

    // Convert the string to a Uint8Array using TextEncoder
    const buf = new TextEncoder().encode(str);

    // Create a new BLAKE2s hash
    const h = new BLAKE2s(20, undefined);

    // Update the hash with the buffer
    h.update(buf);

    // Return the hexadecimal digest
    return h.hexDigest();
}

const FUNDING_IDX = 2;
const AUTH_IDX = 4;

// This method takes any User (i.e. smart contract id + payload tuple), hashes it
// and emits the transaction given as input.
// If the input transaction contains Take or Store, the method will abort.
function proxyTransaction(contextTx: TxContext): NewTx[] {
    console.log("in proxy transaction");
    const contextCall = getContextCall();
    let self = getContractId(contextTx);
    const selfIssuer = contractIssuer(self);
    const args: ResolvedOperation[] = getContractArguments(contextTx);
    args.forEach((x: ResolvedOperation) => "CallOp" in x || console.log(JSON.stringify(x)));
    const providedCwebClaim = extractDataUnverified(args[FUNDING_IDX]);
    if (!providedCwebClaim) {
        throw "Expected to get provided cweb DataOp for contract execution";
    }
    const providedCweb = parseInt(providedCwebClaim.toString(), 16);
    console.log("Cweb for buying: ", providedCweb);
    const childCweb = providedCweb - 10000;
    const limit = 0;
    const [, data] = getMethodArguments(contextTx);
    console.log(`data: ${JSON.stringify(data)}`);
    const authClaim = args[AUTH_IDX];
    if (!isResolvedData(authClaim) || !isDataVerified(authClaim.DataOp)) {
        throw "Expected verified claim as contract argument 5";
    }
    const verified = authClaim.DataOp.Verified;
    const [aux, inputPayload] = verified.content.body as any[];
    const issuer = (verified.issuer as ContractIssuer).FromSmartContract;
    if (!issuer) {
        throw "Invalid issuer";
    }
    const user = [issuer, inputPayload];
    const payload = hashObject(user);

    return [
        continueTx([
            dataVerified(
                genericClaim(claimKey(null, null), null, toHex(1000000 /*childCweb*/)),
                selfIssuer,
            ),
            callLegacy(2, tokenizationBlockContractId()),
            dataUnverified(data),
            // Create Auth claim
            dataVerified(genericClaim(claimKey(null, null), [aux, payload], toHex(0)), selfIssuer),
        ]),
    ];
}

export function cwebMain() {
    console.log("start");
    addMethodHandler(PROXY, proxyTransaction);
    console.log("after add method handler");
    addMethodHandler(SELF_REGISTER_HANDLER_NAME, selfRegisterHandler);
    console.log("after self register handler");
    const contextTx = getContextTx();
    console.log("after get context tx");
    executeHandler(contextTx);
    console.log("after execute handler");
}
