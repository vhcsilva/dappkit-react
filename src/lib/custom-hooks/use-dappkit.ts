import {create} from "zustand";
import type {provider as Provider} from "web3-core";
import {Web3Connection} from "@taikai/dappkit";
import {useShallow} from "zustand/react/shallow";
import {useCallback, useEffect, useState} from "react";

type UseDappkit = {
  setProvider(p: Provider): void,
  initializeConnection(): void,
  disconnect(): void,
  provider: Provider|null,
  connection: Web3Connection|null
}

export const useDappkit = create<UseDappkit>((set, get) => ({
  setProvider: (provider: Provider) =>
    set(() => ({provider, connection: null})),
  initializeConnection: () =>
    set(() =>
      ({connection: new Web3Connection({web3CustomProvider: get().provider})})),
  disconnect: () => {
    if (!get().provider)
      return;
    if (get().provider?.hasOwnProperty("disconnect"))
      (get().provider as any)?.disconnect();

    set(() => ({connection: null, provider: null}))
  },
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

  const connect = useCallback(
    async () => {
      if (!connection) {
        setAddress("");
        setChainId(0);
        setConnected(false);
        return;
      }

      const _address = await connection.getAddress();
      setChainId(await connection.getETHNetworkId())
      setAddress(_address);
      setConnected(!!_address);
    }, [connection]
  )

  useEffect(() => { connect() }, [connection])

  return {chainId, address, connected}
}