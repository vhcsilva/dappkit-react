import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useConnectorHooks} from "../../../hoox/use-connector-hooks";
import {hooks} from "../../../connectors/coinbase-wallet";
import {useConnectEagerly} from "../../../hoox/use-connect-eagerly";
import ConnectorCard from "../connector-card";
import {Chains} from "../../../connectors/chains";
import {metamaskWallet} from "../../../connectors/metamask-wallet";
import {useDappkitConnectionInfo} from "../../../hoox/use-dappkit";

export default function MetamaskCard({onConnectorConnect, onConnectorDisconnect}: CustomConnectorCardProps) {
  const {isActivating, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  useConnectEagerly(metamaskWallet);

  return <ConnectorCard connector={metamaskWallet}
                        chainIds={Chains}
                        activeChainId={chainId || 0}
                        isActivating={isActivating}
                        onConnectorConnect={onConnectorConnect}
                        onConnectorDisconnect={onConnectorDisconnect}
                        isActive={connected}
                        setError={setError}
                        error={error} />
}