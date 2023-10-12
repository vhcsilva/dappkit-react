import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {useConnectEagerly} from "../../../custom-hooks/use-connect-eagerly";
import {ConnectorCard} from "../index";
import {Chains} from "../../../connectors/chains";
import {metamaskWallet, hooks} from "../../../connectors/metamask-wallet";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";

export function MetamaskCard({onConnectorConnect, onConnectorDisconnect}: CustomConnectorCardProps) {
  const {isActivating, isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  useConnectEagerly(metamaskWallet);

  return <ConnectorCard connector={metamaskWallet}
                        chainIds={Chains}
                        activeChainId={chainId || 0}
                        isActivating={isActivating}
                        onConnectorConnect={onConnectorConnect}
                        onConnectorDisconnect={onConnectorDisconnect}
                        isActive={connected && isActive}
                        setError={setError}
                        error={error} />
}