import {coinbaseWallet, hooks} from "../../../connectors/coinbase-wallet";
import ConnectorCard from "../connector-card";
import {Chains} from "../../../connectors/chains";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {useConnectEagerly} from "../../../custom-hooks/use-connect-eagerly";
import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";

export default function CoinbaseCard({onConnectorConnect, onConnectorDisconnect}: CustomConnectorCardProps) {
  const {isActivating, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  useConnectEagerly(coinbaseWallet);

  return <ConnectorCard connector={coinbaseWallet}
                        chainIds={Chains}
                        activeChainId={chainId || 0}
                        isActivating={isActivating}
                        onConnectorConnect={onConnectorConnect}
                        onConnectorDisconnect={onConnectorDisconnect}
                        isActive={connected}
                        setError={setError}
                        error={error} />
}