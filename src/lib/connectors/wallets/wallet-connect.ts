import {initializeConnector} from "@web3-react/core";
import {WalletConnect} from "@web3-react/walletconnect-v2";

const WALLET_CONNECT_PROJECT_ID = process.env.WALLET_CONNECT_PROJECT_ID;

export const [walletConnect, hooks] =
  initializeConnector<WalletConnect>(actions =>
    new WalletConnect({
      actions,
      options: {projectId: WALLET_CONNECT_PROJECT_ID!, chains: [1], showQrModal: true}})
  )