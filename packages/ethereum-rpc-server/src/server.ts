import { createServer } from "./eth_rpc_server.js";

const server = createServer();
server.listen(3000, () => {
  console.log("Ethereum RPC server listening on port 3000");
});
