const events = {};

export default {
  isMetaMask: true,
  on() {},
  request: async (request: { method: string, params?: Array<unknown> }) => {
    switch (request.method) {
      case 'eth_accounts':
      case 'eth_requestAccounts':
        return ["0xf15CC0ccBdDA041e2508B829541917823222F364"];
      case 'personal_sign':
        return process.env.TEST_SIGNED_MESSAGE;
      case 'eth_chainId':
        return 1;
      case 'wallet_switchEthereumChain':
        return true;
      default:
        throw Error(`Unknown request: ${request.method}`)
    }
  }
}