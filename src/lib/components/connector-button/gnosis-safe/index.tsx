import {useConnectorHooks} from "../../../custom-hooks/use-connector-hooks";
import {CustomConnectorButtonProps} from "../../../types/custom-connector-button";
import {useDappkitConnectionInfo} from "../../../custom-hooks/use-dappkit";
import {gnosisSafe, hooks} from "../../../connectors/wallets/gnosis-safe";
import {ConnectorButton} from "../index";
import Logo from "./logo.svg";

export function GnosisSafeButton({onConnectorConnect, onConnectorDisconnect, variant}: CustomConnectorButtonProps) {
  const {isActive, error, setError} = useConnectorHooks(hooks);
  const {chainId, connected} = useDappkitConnectionInfo();

  return <ConnectorButton connector={gnosisSafe}
                          logo={<Logo />}
                          variant={variant}
                          activeChainId={chainId || 0}
                          onConnectorConnect={onConnectorConnect}
                          onConnectorDisconnect={onConnectorDisconnect}
                          isActive={connected && isActive}
                          setError={setError}
                          error={error}/>
}