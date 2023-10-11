import React from 'react';
import './App.css';
import type {provider as Provider} from "web3-core";
import CoinbaseCard from "./components/connector-card/coinbase-card/coinbase-card";
import MetamaskCard from "./components/connector-card/metamask-card/metamask-card";
import {useDappkit, useDappkitConnectionInfo} from "./custom-hooks/use-dappkit";
import GnosisSafeCard from "./components/connector-card/gnosis-safe-card/gnosis-safe-card";

function App() {

  const {setProvider, initializeConnection} =
    useDappkit(({setProvider, initializeConnection}) =>
      ({setProvider, initializeConnection}));

  const {address} = useDappkitConnectionInfo();

  async function onConnectorConnect(provider: Provider) {
    setProvider(null);
    setProvider(provider);
    initializeConnection();
  }

  async function onConnectorDisconnect() {
    setProvider(null);
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <CoinbaseCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect} />
        <MetamaskCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect}/>
        <GnosisSafeCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect}/>
      </header>

      <div className="address">{address}</div>

    </div>
  );
}

export default App;
