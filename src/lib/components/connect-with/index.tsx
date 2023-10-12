import type {ConnectWithProps} from "../../types/connect-with";
import {useCallback, useState} from "react";
import {ChainSelector} from "../chain-selector";
import {provider as Provider} from "web3-core";
import {Button} from "@taikai/rocket-kit";

export function ConnectWith({activeChainId, setError, connector, chainIds, isActive, error, onConnectorConnect, onConnectorDisconnect}: ConnectWithProps) {
  const [desiredChainId, setDesiredChainId] = useState<number|undefined>(undefined);

  const switchChain = useCallback(
    async (_desiredChainId: number) => {
      setDesiredChainId(_desiredChainId);
      try {
        if ((_desiredChainId === activeChainId) || (_desiredChainId === -1 && activeChainId !== undefined)) {
          setError(undefined);
          return;
        }

        await connector.activate(_desiredChainId);
        if (connector.provider)
          onConnectorConnect?.(connector.provider as unknown as Provider);
        else throw new Error(`Failed to get a provider, make sure your connector has one!`)

      } catch (e: any) {
        setError(e);
      }
    }, [connector, activeChainId, setError, onConnectorConnect]
  )

  async function retry() {
    await switchChain(desiredChainId!)
  }

  async function onDisconnectClick() {
    if (connector?.deactivate)
      void connector.deactivate();
    else void connector?.resetState();

    setDesiredChainId(undefined);
    onConnectorDisconnect?.()
  }

  async function onSelectChain() {
    if (desiredChainId)
      await switchChain(desiredChainId)
  }

  return <div style={{textAlign: "center"}}>
    <ChainSelector activeChainId={desiredChainId || -1}
                   chainIds={chainIds}
                   onSelected={id => setDesiredChainId(id)} />

    <div style={{margin: "1rem 0 0", display: "inline-flex", alignItems: "center"}}>
      {isActive
        ? error
          ? (<Button action={() => retry()} value="try again?"/>)
          : (<Button action={() => onDisconnectClick()} value="Disconnect"/>)
        : (<Button action={() => onSelectChain()} value={error ? "try again?" : "connect"}/>)
      }
    </div>
  </div>
}