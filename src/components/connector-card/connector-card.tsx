import {CSSProperties} from "react";
import StatusIndicator from "../status-indicator/status-indicator";
import ChainInfo from "../chain-info/chain-info";
import ConnectWith from "../connect-with/connect-with";
import {ConnectorCardProps} from "../../types/connector-card";

export default function ConnectorCard({
                                        connector,
                                        isActivating,
                                        isActive,
                                        setError,
                                        error,
                                        chainIds = [],
                                        activeChainId, onConnectorConnect, onConnectorDisconnect,
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
    <b>{connector?.constructor.name}</b>
    <div style={{marginBottom: "1rem"}}>
      <StatusIndicator isActivating={isActivating} isActive={isActive} error={error}/>
    </div>
    <ChainInfo id={activeChainId?.toString()}/>
    <ConnectWith activeChainId={activeChainId}
                 setError={setError}
                 onConnectorConnect={onConnectorConnect}
                 onConnectorDisconnect={onConnectorDisconnect}
                 connector={connector}
                 chainIds={chainIds}
                 isActivating={isActivating}
                 isActive={isActive}
                 error={error}/>
  </div>
}