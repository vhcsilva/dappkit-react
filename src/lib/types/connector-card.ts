import type {provider as Provider} from "web3-core";
import {ConnectWithProps} from "./connect-with";
import {ChainSelectorProps} from "./chain-selector";
import {StatusIndicatorProps} from "./status-indicator";

export type CustomConnectorCardProps = {
  onConnectorConnect(p: Provider): void;
  onConnectorDisconnect(): void;
}

export type ConnectorCardProps = ConnectWithProps & Omit<ChainSelectorProps, "onSelected"> & StatusIndicatorProps;