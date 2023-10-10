import {ChainSelectorProps} from "./chain-selector.d";

export default function ChainSelector({activeChainId, switchChainId, chainIds}: ChainSelectorProps) {
  return <select value={activeChainId}
                 onChange={(e) => switchChainId(Number(e.target.value))}>
      <option hidden value={-2}>Select chain</option>
      <option value={-1}>Default</option>
    {chainIds.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
  </select>
}