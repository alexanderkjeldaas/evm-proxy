import { balanceOf, computeFunctionSelector } from './eth_call.js';

describe("eth_call", () => {
  test("computeFunctionSelector should return correct function selector", () => {
    const functionSignature = 'balanceOf(address)';
    const functionSelector = computeFunctionSelector(functionSignature);
    expect(functionSelector).toBe('0x70a08231');
  });

  test("balanceOf should return correct", async () => {
    const address = '022264d573e7b88863ee056a19284c35e40e175e7b5d5adb477eb8d0530a4d046a';
    const token =  '0x221a77257b9916f89c78b21d9316281525b6f255ace91ac9e477813dfac28a5d';
    const balance = await balanceOf(token, address)
    expect(balance).toBe('asdf');

  });

});
