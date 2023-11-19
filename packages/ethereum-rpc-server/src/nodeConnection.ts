import {
  fetch_claims,
  connect_to_node,
  NodeConnection,
} from '@coinweb/wallet-lib'
import { NetworkName } from '@coinweb/wallet-lib/enums'
import dotenv from 'dotenv'

dotenv.config()

export const networkName: NetworkName =
  (process.env.COINWEB_NETWORK_NAME as NetworkName) || NetworkName.DEVNET_L1A

export const node: NodeConnection = connect_to_node(
  process.env.COINWEB_API_ENDPOINT || 'https://api-devnet.coinweb.io/wallet'
)
