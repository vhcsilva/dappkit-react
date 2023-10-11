import ConnectorCard from "../connector-card";
import {Chains} from "../../../connectors/chains";
import {useConnectorHooks} from "../../../hoox/use-connector-hooks";
import {useConnectEagerly} from "../../../hoox/use-connect-eagerly";
import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useDappkitConnectionInfo} from "../../../hoox/use-dappkit";
import {gnosisSafe, hooks} from "../../../connectors/gnosis-safe";

export default function GnosisSafeCard({onConnectorConnect, onConnectorDisconnect}: CustomConnectorCardProps) {
  const {isActivating, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  useConnectEagerly(gnosisSafe);

  return <ConnectorCard connector={gnosisSafe}
                        chainIds={Chains}
                        activeChainId={chainId || 0}
                        isActivating={isActivating}
                        onConnectorConnect={onConnectorConnect}
                        onConnectorDisconnect={onConnectorDisconnect}
                        isActive={connected}
                        setError={setError}
                        error={error} />
}