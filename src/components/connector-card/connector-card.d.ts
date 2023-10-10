import {StatusIndicatorProps} from "../connect-with/connect-with.d";
import type {provider as Provider} from "web3-core";

interface Props {
  onProviderSelected(): Provider;
}

export type ConnectorCardProps = Props & ConnectWithProps