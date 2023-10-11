import {create} from "zustand";
import type {provider as Provider} from "web3-core";
import {Web3Connection} from "@taikai/dappkit";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";

type UseDappkit = {
  setProvider(p: Provider): void,
  initializeConnection(): void,
  provider: Provider|null,
  connection: Web3Connection|null
}

export const useDappkit = create<UseDappkit>((set, get) => ({
  setProvider: (provider: Provider) =>
    set(() => ({provider, connection: null})),
  initializeConnection: () =>
    set(() =>
      ({connection: new Web3Connection({web3CustomProvider: get().provider})})),
  provider: null,
  connection: null,
}))

export const useDappkitConnection = () =>
  useDappkit(useShallow(({connection}) => ({connection})));

export const useDappkitConnectionInfo = () => {
  const [chainId, setChainId] = useState(0);
  const [address, setAddress] = useState("");
  const [connected, setConnected] = useState<boolean>(false);
  const {connection} = useDappkitConnection();

  useEffect(() => {
    if (!connection) {
      setAddress("");
      setChainId(0);
      setConnected(false);
      return;
    }

    (async () => {
      const _address = await connection.getAddress();
      setChainId(await connection.getETHNetworkId())
      setAddress(_address);
      setConnected(!!_address);
    })()
  }, [connection])

  return {chainId, address, connected}
}