import {ChainSelectorProps} from "../../types/chain-selector";
import {SelectInteractive} from "@taikai/rocket-kit";
import {useCallback} from "react";
import {TOptions} from "@taikai/rocket-kit/dist/atoms/select-interactive/types";

export function ChainSelector({activeChainId, onSelected, chainIds}: ChainSelectorProps) {
  const _onChange = useCallback((option: TOptions|TOptions[]) => {
     onSelected(+(option as TOptions).value);
  }, [onSelected]);

  return <SelectInteractive search
                            value={{value: activeChainId.toString(), label: chainIds.find(c => c.value === activeChainId.toString())?.label || "" }}
                            onChange={_onChange}
                            options={chainIds} />
}