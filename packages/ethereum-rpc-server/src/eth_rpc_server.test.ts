import request from 'supertest';
import { createServer } from './eth_rpc_server.js';
import { net_version } from "./net_version.js";
import { eth_blockNumber } from "./eth_blockNumber.js";
import { eth_getBlockByNumber } from "./eth_getBlockByNumber.js";
import { eth_getBalance } from "./eth_getBalance.js";
import { eth_call } from "./eth_call.js";

describe("Ethereum RPC Server", () => {
  test("net_version should return a string", async () => {
    console.log("Running test for net_version...");
    const server = createServer();
    const response = await (request(server) as any)
      .post('/')
      .send({ id: 1, jsonrpc: "2.0", method: "net_version", params: [] });
    console.log("net_version result:", response.body);
    expect(response.body.result).toBe("1703171539622");
    expect(response.body.id).toBe(1);
    expect(response.body.jsonrpc).toBe("2.0");
  });

  test("eth_blockNumber should return a string 2", async () => {
    console.log("Running test for eth_blockNumber...");
    const server = createServer();
    const response = await (request(server) as any)
      .post('/')
      .send({ id: 2, jsonrpc: "2.0", method: "eth_blockNumber", params: [] });
    console.log("eth_blockNumber result:", response.body);
    expect(typeof response.body.result).toBe("string");
    expect(response.body.id).toBe(2);
    expect(response.body.jsonrpc).toBe("2.0");
  });

  test("eth_getBlockByNumber should return an object", async () => {
    console.log("Running test for eth_getBlockByNumber...");
    const server = createServer();
    const response = await (request(server) as any)
      .post('/')
      .send({
        id: 3,
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["0x0", false],
      });
    console.log("eth_getBlockByNumber result:", response.body);
    expect(typeof response.body.result).toBe("object");
    expect(response.body.id).toBe(3);
    expect(response.body.jsonrpc).toBe("2.0");
  });

  test("eth_getBalance should return a string", async () => {
    console.log("Running test for eth_getBalance...");
    const server = createServer();
    const response = await (request(server) as any)
      .post('/')
      .send({
        id: 4,
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: ["0x50f4d8261236b9670cba7110344ccb2e84c12e02", "0x0"],
      });
    console.log("eth_getBalance result:", response.body);
    expect(typeof response.body.result).toBe("string");
    expect(response.body.id).toBe(4);
    expect(response.body.jsonrpc).toBe("2.0");
  });

  test("eth_call should return a string", async () => {
    console.log("Running test for eth_call...");
    const server = createServer();
    const response = await (request(server) as any)
      .post('/')
      .send({
        id: 3395,
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          {
            "to": "0x3506424f91fd33084466f402d5d97f05f8e3b4af",
            "data": "0x70a082310000000000000000000000009c8b19e212b7b5b5a5b2929f2a7492ba4d0f7b19"
          },
          "0x0"
        ]
      });
    console.log("eth_call result:", response.body);
    expect(typeof response.body.result).toBe("string");
    expect(response.body.result).toBe("0x70a08231");
    expect(response.body.id).toBe(3395);
    expect(response.body.jsonrpc).toBe("2.0");
  });
});
