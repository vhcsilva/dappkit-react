import {ChainSelectorProps} from "./chain-selector.d";
import {StatusIndicatorProps} from "../status-indicator/status-indicator";
import type {provider as Provider} from "web3-core";

interface Props {
  connector: any;
  onProviderSelected(): Provider
}

export type ConnectWithProps = Props & ChainSelectorProps & StatusIndicatorProps