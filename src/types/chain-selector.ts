export interface ChainSelectorProps {
  activeChainId: number;
  onSelected: (id: number) => void;
  chainIds: { name: string; id: number }[]
}