import {Connector} from "@web3-react/types";
import {CoinbaseWallet} from "@web3-react/coinbase-wallet";
import {ConnectorsNames} from "../../types/connectors";
import {MetaMask} from "@web3-react/metamask";
import {GnosisSafe} from "@web3-react/gnosis-safe";

export function getConnectorName(connector: Connector) {
  if (connector instanceof CoinbaseWallet)
    return ConnectorsNames.Coinbase;
  if (connector instanceof MetaMask)
    return ConnectorsNames.Metamask;
  if (connector instanceof GnosisSafe)
    return ConnectorsNames.GnosisSafe;
}