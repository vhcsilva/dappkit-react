import {Web3ReactHooks} from "@web3-react/core";
import {useState} from "react";

export function useConnectorHooks(hooks: Web3ReactHooks) {
  const {useIsActivating, useIsActive, useChainId, } = hooks;

  const chainId = useChainId();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  const [error, setError] = useState<Error|undefined>(undefined);

  return {chainId, isActivating, isActive, error, setError}
}