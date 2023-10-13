import {Connector} from "@web3-react/types";
import {useEffect} from "react";
import {getConnectorName} from "../connectors/get-connector-name";

export function useConnectEagerly(connector: Connector) {
  useEffect(() => {
    void (connector?.connectEagerly?.() || connector?.activate?.() || Promise.reject("Connector has no eager method"))
      .catch(e => {
        console.debug(`Failed to connect eagerly to ${getConnectorName(connector)}`, e);
      });
  }, [connector])
}