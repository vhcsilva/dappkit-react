import type {provider as Provider} from "web3-core";
import {ConnectorButtonProps} from "./connector-button";
import {ModalModes} from "./wallet-selector";

export type CustomConnectorCardProps = {
  onConnectorConnect(p: Provider): void;
  onConnectorDisconnect(): void;
  variant: ModalModes;
}

export type ConnectorCardProps = CustomConnectorCardProps & ConnectorButtonProps;