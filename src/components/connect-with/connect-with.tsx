import type {ConnectWithProps} from "./connect-with.d";
import {CSSProperties, useCallback, useEffect, useState} from "react";
import ChainSelector from "../chain-selector/chain-selector";

export default function ConnectWith({activeChainId, setError, connector, chainIds, isActive, error, onProviderSelected}: ConnectWithProps) {
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
        onProviderSelected(connector.provider)

      } catch (e) {
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
  }

  async function onSelectChain() {
    if (desiredChainId)
      await switchChain(desiredChainId)
  }

  useEffect(() => {
    if ((activeChainId) && (!desiredChainId || desiredChainId === -1))
      setDesiredChainId(activeChainId);
  }, [activeChainId, desiredChainId]);

  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
  }

  return <div style={style}>
    <ChainSelector activeChainId={activeChainId} chainIds={chainIds} switchChainId={switchChain} />

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