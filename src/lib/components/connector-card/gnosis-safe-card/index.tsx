import {ConnectorCard} from "../index";
import {Chains} from "../../../connectors/chains";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {useConnectEagerly} from "../../../custom-hooks/use-connect-eagerly";
import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import {gnosisSafe, hooks} from "../../../connectors/gnosis-safe";

export function GnosisSafeCard({onConnectorConnect, onConnectorDisconnect}: CustomConnectorCardProps) {
  const {isActivating, isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  useConnectEagerly(gnosisSafe);

  return <ConnectorCard connector={gnosisSafe}
                        chainIds={Chains}
                        activeChainId={chainId || 0}
                        isActivating={isActivating}
                        onConnectorConnect={onConnectorConnect}
                        onConnectorDisconnect={onConnectorDisconnect}
                        isActive={connected && isActive}
                        setError={setError}
                        error={error} />
}