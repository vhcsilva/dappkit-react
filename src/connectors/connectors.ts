import {CoinbaseWallet} from "@web3-react/coinbase-wallet";
import {Web3ReactStateUpdate} from "@web3-react/types";

const update = (stateUpdate: Web3ReactStateUpdate) => {
  console.log(`state update`,stateUpdate);
};
const resetState = () => {
  console.log(`reset state`)
};
const startActivation = () => () => {
  console.log(`Start activation`)
};

export const Connectors = [
  new CoinbaseWallet({actions: {update, resetState, startActivation}, options: {url: "https://eth.llamarpc.com", appName: "@taikai/dappkit"}})
]