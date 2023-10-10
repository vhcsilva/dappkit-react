export interface ChainSelectorProps {
  activeChainId: number;
  switchChainId: (id: number) => void;
  chainIds: { name: string; id: number }[]
}