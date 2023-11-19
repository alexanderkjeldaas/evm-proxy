import express from "express";
import bodyParser from "body-parser";
import { eth_blockNumber } from "./eth_blockNumber.js";
import { net_version } from "./net_version.js";
import { eth_getBalance } from "./eth_getBalance.js";
import { eth_getBlockByNumber } from "./eth_getBlockByNumber.js";
import { eth_call } from "./eth_call.js";

export function createServer() {
  const app = express();
  app.use(bodyParser.json());

  app.use("/", (req, res, next) => {
    const { id, jsonrpc } = req.body;

    if (jsonrpc !== "2.0") {
      res.status(400).send("Invalid jsonrpc value");
      return;
    }

    res.locals.id = id;
    next();
  });

  app.post("/", (req, res) => {
    const { id, jsonrpc, method, params } = req.body;

    let result;
    switch (method) {
      case "eth_blockNumber":
        result = eth_blockNumber();
        break;
      case "net_version":
        result = net_version();
        break;
      case "eth_getBlockByNumber":
        result = eth_getBlockByNumber(params[0], params[1]);
        break;
      case "eth_getBalance":
        result = eth_getBalance(params[0], params[1]);
        break;
      case "eth_call":
        result = eth_call(params[0], params[1]);
        break;
      default:
        res.status(400).send("Invalid method");
        return;
    }

    res.send({
      id: res.locals.id,
      jsonrpc: "2.0",
      result,
    });
  });

  return app;
}
