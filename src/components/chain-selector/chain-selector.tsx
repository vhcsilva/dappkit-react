import {ChainSelectorProps} from "../../types/chain-selector";
import {SelectInteractive} from "@taikai/rocket-kit";
import {useCallback} from "react";
import {TOptions} from "@taikai/rocket-kit/dist/atoms/select-interactive/types";

export default function ChainSelector({activeChainId, onSelected, chainIds}: ChainSelectorProps) {
  const _onChange = useCallback((option: TOptions|TOptions[]) => {
     onSelected(+(option as TOptions).value);
  }, []);

  return <SelectInteractive search
                            value={{value: activeChainId.toString(), label: ""}}
                            onChange={_onChange}
                            options={chainIds} />
}