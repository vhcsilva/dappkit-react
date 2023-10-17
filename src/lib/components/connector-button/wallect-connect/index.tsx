import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import {ConnectorButton} from "../index";
import {hooks, walletConnect} from "../../../connectors/wallets/wallet-connect";
import Logo from "./logo.svg";

export function WalletConnectButton({onConnectorConnect, onConnectorDisconnect, variant}: CustomConnectorButtonProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  return <ConnectorButton connector={walletConnect}
                          logo={<Logo/>}
                          variant={variant}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={connected && isActive}
                          setError={setError}
                          error={error}/>
}