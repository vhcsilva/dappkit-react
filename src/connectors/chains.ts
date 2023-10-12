import {ChainSelectorOption} from "../types/chain-selector";

export const Chains: ChainSelectorOption[] = [
  {
    label: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    value: "1",
    urls: ["https://cloudflare-eth.com"]
  },
  {
    label: 'Mumbai',
    symbol: 'MATIC',
    decimals: 18,
    value: "80001",
    urls: ["https://polygon-mumbai-bor.publicnode.com"]
  }
]