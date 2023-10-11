import type {ConnectWithProps} from "../../types/connect-with";
import {CSSProperties, useCallback, useEffect, useState} from "react";
import ChainSelector from "../chain-selector/chain-selector";
import {provider as Provider} from "web3-core";

export default function ConnectWith({activeChainId, setError, connector, chainIds, isActive, error, onConnectorConnect, onConnectorDisconnect}: ConnectWithProps) {
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
    }, [connector, activeChainId, setError]
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

  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
  }

  return <div style={style}>
    <ChainSelector activeChainId={desiredChainId || -1}
                   chainIds={chainIds}
                   onSelected={id => setDesiredChainId(id)} />

    <div style={{marginBottom: "1rem"}}>
      {isActive
        ? error
          ? (<button onClick={() => retry()}>try again?</button>)
          : (<button onClick={() => onDisconnectClick()}>Disconnect</button>)
        : (<button onClick={() => onSelectChain()}>{error ? "try again?" : "connect"}</button>)
      }
    </div>
  </div>
}