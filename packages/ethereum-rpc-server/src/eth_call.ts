import assert from 'assert';
import { keccak256 } from 'js-sha3';
import { node, networkName } from './nodeConnection.js';
import { OnChainQuery, OnChainQueryResult, User, fetchTokenizationQuery } from '@coinweb/wallet-lib';
import { NetworkName, UserQuery } from '@coinweb/wallet-lib/enums';

/// export function fetchTokenizationQuery(connection: NodeConnection, queries: OnChainQuery[], network: NetworkName, load_all_pages: Boolean): Promise<OnChainQueryResult[]>;
//

export function computeFunctionSelector(functionSignature: string): string {
    const hash = keccak256(functionSignature);
    return `0x${hash.substring(0, 8)}`;
}

export function eth_call(params: any, blockNumber: string) {
    const { to, data } = params;
    const functionDesignator = data.substring(0, 10);
    const balanceOfFunction = computeFunctionSelector('balanceOf(address)');
    if (functionDesignator === balanceOfFunction) {
        assert(balanceOfFunction, '0x70a08231');
        const addressParameter = data.substring(10);
        return balanceOf(to, addressParameter);
    }
    throw new Error(`Function selector for '${functionDesignator}' does not match sha3('balanceOf(address)')`);
}

export async function balanceOf(to: string, addressParameter: string): Promise<string> {
    assert(to.length === 42, 'The length of "to" should be 42');
    assert(addressParameter.length === 64, 'The length of "addressParameter" should be 64');
    // Implement the balanceOf function here
    const user: User = { auth: "EcdsaContract", payload: addressParameter };
    const userQuery: UserQuery = UserQuery.HeldTokens;
    const queries: OnChainQuery[] = [
        { UserQuery: [user, userQuery] }
    ]; // Define your queries here
    const network: NetworkName = networkName; // Define your network here
    const load_all_pages = true; // Or false, depending on your needs
    const results = await fetchTokenizationQuery(node, queries, network, load_all_pages);
    // Process results and return the appropriate string
    assert(results.length === 1, "Wrong length");
    const result: OnChainQueryResult = results[0];
    assert('UserQueryResult' in result);
    const userQueryResult = result.UserQueryResult;
    assert('HeldTokens' in userQueryResult);
    const heldTokens  = userQueryResult.HeldTokens;
    assert('Ok' in heldTokens);
    for (const [token_hash_id, token_amount] of heldTokens.Ok) {
        if (token_hash_id === to) {
            const amount: string = token_amount as unknown as string;
            return `0x${amount}`;
        }
    }
    return "0x";
}
