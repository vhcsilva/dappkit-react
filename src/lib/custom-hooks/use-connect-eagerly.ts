import {Connector} from "@web3-react/types";
import {useEffect} from "react";

export function useConnectEagerly(connector: Connector) {
  useEffect(() => {
    void (connector?.connectEagerly?.() || connector?.activate?.() || Promise.reject("Connector has no eager method"))
      .catch(e => {
        console.debug(`Failed to connect eagerly to ${connector.constructor.name}`, e);
      });
  }, [connector])
}