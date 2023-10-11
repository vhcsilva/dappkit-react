import type {provider as Provider} from "web3-core";
import {Connector} from "@web3-react/types";
import {StatusIndicatorProps} from "./status-indicator";
import {ChainSelectorProps} from "./chain-selector";

export type Props = {
  connector: Connector;
  onConnectorConnect(p: Provider): void
  onConnectorDisconnect(): void
  setError: (e?: Error) => void;
};

export type ConnectWithProps = Props & Omit<ChainSelectorProps, "switchChainId"> & StatusIndicatorProps;