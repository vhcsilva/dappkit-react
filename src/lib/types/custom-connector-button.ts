import type {provider as Provider} from "web3-core";
import {ModalModes} from "./wallet-selector";

export type CustomConnectorButtonProps = {
  onConnectorConnect(p: Provider): void;
  onConnectorDisconnect(): void;
  variant: ModalModes;
}