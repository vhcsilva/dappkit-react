import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {hooks, metamaskWallet} from "../../../connectors/wallets/metamask-wallet";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import Logo from "./logo.svg";
import {ConnectorButton} from "../index";

export function MetamaskButton({onConnectorConnect, onConnectorDisconnect, variant}: CustomConnectorButtonProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  return <ConnectorButton connector={metamaskWallet}
                          logo={<Logo/>}
                          variant={variant}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={connected && isActive}
                          setError={setError}
                          error={error}/>
}