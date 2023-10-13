import {CSSProperties} from "react";
import StatusIndicator from "../status-indicator";
import {ChainInfo} from "../chain-info";
import {ConnectWith} from "../connect-with";
import {ConnectorCardProps} from "../../types/connector-card";
import {getConnectorName} from "../../connectors/get-connector-name";

export function ConnectorCard({
                                        connector,
                                        isActivating,
                                        isActive,
                                        setError,
                                        error,
                                        chainIds = [],
                                        activeChainId,
                                        onConnectorConnect,
                                        onConnectorDisconnect,
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
    <b>{getConnectorName(connector)}</b>
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