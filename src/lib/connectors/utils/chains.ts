import {TOptions} from "@taikai/rocket-kit/dist/atoms/select-interactive/types";

export const Chains: TOptions[] = [
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