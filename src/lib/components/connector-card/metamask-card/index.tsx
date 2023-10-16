import {CustomConnectorCardProps} from "../../../types/connector-card";
import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {hooks, metamaskWallet} from "../../../connectors/metamask-wallet";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import Logo from "./logo.svg";
import {ConnectorButton} from "../../connector-button";

export function MetamaskCard({onConnectorConnect, onConnectorDisconnect, variant}: CustomConnectorCardProps) {
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