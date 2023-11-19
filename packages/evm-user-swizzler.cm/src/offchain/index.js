// This is the offchain part of the smart contract.
// We put code here that we want to be authenticated.

import onchainPackage from "../../dist/out/package.json" assert { type: "json" };
import isDeepEqual from "./isDeepEqual.js";

// We fetch the contract id from the name of our contract module in ../out
// The contract module's name is always `cweb_<<contract id>>` so we use
// this to construct our hex version of the contract id.
export const contractId = `0x${onchainPackage.name.substr(5)}`;

export const claimFilter = {
    issuer: {
        FromSmartContract: contractId,
    },
    keyFirstPart: 1,
    keySecondPart: 4,
};

// The expected claim.  We use this in our test to check that the
// claim is what it should be.
export const correctClaim = {
    issuer: claimFilter.issuer,
    content: {
        key: {
            first_part: 1,
            second_part: 4,
        },
        body: "hello world",
        fees_stored: "0x0000000000000000000000000000000000000000000000000000000000000000",
    },
};

// In our hello world example, we just check that the claim we
// read had the correct data.
export function isClaimOk(claim) {
    return isDeepEqual(claim, correctClaim);
}
