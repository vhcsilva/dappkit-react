import {TOptions} from "@taikai/rocket-kit/dist/atoms/select-interactive/types";

export type ChainSelectorOption = TOptions;
export type ChainSelectorProps = {
  activeChainId: number;
  onSelected: (id: number) => void;
  chainIds: ChainSelectorOption[]
}