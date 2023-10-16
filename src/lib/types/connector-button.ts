import type {provider as Provider} from "web3-core";
import {Connector} from "@web3-react/types";
import {ReactNode} from "react";
import {ModalModes} from "./wallet-selector";

export type Props = {
  connector: Connector;
  onConnectorConnect(p: Provider): void
  onConnectorDisconnect(): void
  setError: (e?: Error) => void;
  error: Error|undefined;
  isActive: boolean;
  activeChainId: number;
  logo?: ReactNode;
  variant: ModalModes;
};

export type ConnectorButtonProps = Props;