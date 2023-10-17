import {coinbaseWallet, hooks} from "../../../connectors/wallets/coinbase-wallet";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import Logo from "./logo.svg";
import {ConnectorButton} from "../index";

export function CoinbaseButton({onConnectorConnect, onConnectorDisconnect, variant}: CustomConnectorButtonProps) {
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