import type {ConnectorButtonProps} from "../../types/connector-button";
import {useCallback, useState} from "react";
import {provider as Provider} from "web3-core";
import {getConnectorName} from "../../connectors/wallets/get-connector-name";
import styled from "styled-components";
import {ModalModes} from "../../types/wallet-selector";

const Action =
  styled.button`
    width: ${(props: {variant: ModalModes}) => props.variant === ModalModes.Sidebar ? 392 : 163 }px;
    height: 36px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #D9D4ED;
    gap: 8px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-shrink: 1;
    &:hover {
      cursor: pointer;
      background-color: rgba(0,0,0, .05)
    }`;

export function ConnectorButton({activeChainId, setError, connector, isActive, error, onConnectorConnect, logo, onConnectorDisconnect, variant}: ConnectorButtonProps) {
  const [desiredChainId, setDesiredChainId] = useState<number|undefined>(undefined);

  const switchChain = useCallback(
    async (_desiredChainId?: number) => {

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
        connector?.resetState?.();
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

  async function onSelectChain(selected?: number) {
      await switchChain(selected)
  }

  return <div style={{margin: "1rem 0 0", display: "inline-flex", alignItems: "center"}}>
    {isActive
      ? error
        ? (<Action variant={variant} onClick={() => retry()} children="try again?"/>)
        : (<Action variant={variant} onClick={() => onDisconnectClick()} children="Disconnect"/>)
      : (<Action variant={variant} onClick={() => onSelectChain(1)} children={error ? "try again?" : <>{logo} {getConnectorName(connector) || "Unnamed Implementation"}</>}/>)
    }
  </div>
}