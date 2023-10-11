import {ChainSelectorProps} from "../../types/chain-selector";

export default function ChainSelector({activeChainId, onSelected, chainIds}: ChainSelectorProps) {
  return <select value={activeChainId}
                 onChange={(e) => onSelected(Number(e.target.value))}>
      <option hidden value={-2}>Select chain</option>
      <option value={-1}>Default</option>
    {chainIds.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
  </select>
}