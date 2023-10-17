import {CoinbaseWallet} from "@web3-react/coinbase-wallet";
import {initializeConnector} from "@web3-react/core";
import {Chains} from "../utils/chains";

export const [coinbaseWallet, hooks] =
  initializeConnector<CoinbaseWallet>((actions) =>
    new CoinbaseWallet({actions, options: {url: Chains[0].urls[0], appName: process.env.APP_NAME || "@taikai/dappkit"}}))