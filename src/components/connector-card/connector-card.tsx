import {CSSProperties} from "react";
import {ConnectorCardProps} from "./connector-card.d";
import StatusIndicator from "../status-indicator/status-indicator";
import ChainInfo from "../chain-info/chain-info";
import ConnectWith from "../connect-with/connect-with";

export default function ConnectorCard({
                                        connector,
                                        isActivating,
                                        isActive,
                                        setError,
                                        error,
                                        chainIds = [],
                                        activeChainId, onProviderSelected,
                                      }: ConnectorCardProps) {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "20rem",
    padding: "1rem",
    margin: "1rem",
    overflow: "auto",
    border: "1px solid",
    borderRadius: "1rem"
  };

  return <div style={style}>
    <b>Name: {connector?.name}</b>
    <div style={{marginBottom: "1rem"}}>
      <StatusIndicator isActivating={isActivating} isActive={isActive} error={error}/>
    </div>
    <ChainInfo id={activeChainId}/>
    <ConnectWith activeChainId={activeChainId}
                 setError={setError}
                 onProviderSelected={onProviderSelected}
                 connector={connector}
                 chainIds={chainIds}
                 isActivating={isActivating}
                 isActive={isActive}
                 error={error}/>
  </div>
}