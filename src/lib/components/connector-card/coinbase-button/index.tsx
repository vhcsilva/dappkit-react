import {coinbaseWallet, hooks} from "../../../connectors/coinbase-wallet";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import Logo from "./logo.svg";
import {ConnectorButton} from "../../connector-button";

export function CoinbaseButton({onConnectorConnect, onConnectorDisconnect, variant}: CustomConnectorCardProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  return <ConnectorButton activeChainId={chainId || 0}
                          logo={<Logo />}
                          variant={variant}
                          setError={setError}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          connector={coinbaseWallet}
                          isActive={connected && isActive}
                          error={error}/>
}