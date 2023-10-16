import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import {gnosisSafe, hooks} from "../../../connectors/gnosis-safe";
import {ConnectorButton} from "../index";

export function GnosisSafeButton({onConnectorConnect, onConnectorDisconnect, variant}: CustomConnectorCardProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  return <ConnectorButton connector={gnosisSafe}
                          variant={variant}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={connected && isActive}
                          setError={setError}
                          error={error}/>
}