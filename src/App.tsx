import React from 'react';
import './App.css';
import type {provider as Provider} from "web3-core";
import CoinbaseCard from "./components/connector-card/coinbase-card/coinbase-card";
import MetamaskCard from "./components/connector-card/metamask-card/metamask-card";
import {useDappkit, useDappkitConnectionInfo} from "./custom-hooks/use-dappkit";

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
  }

  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <CoinbaseCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect} />
        <MetamaskCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect}/>
        <div style={{textAlign: "center"}}>{address}</div>
      </header>

    </div>
  );
}

export default App;
