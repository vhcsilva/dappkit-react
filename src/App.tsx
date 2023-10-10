import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Connectors} from "./connectors/connectors";
import ConnectorCard from "./components/connector-card/connector-card";
import {Chains} from "./connectors/chains";
import {Web3Connection} from "@taikai/dappkit";
import type {provider as Provider} from "web3-core";

function App() {
  const [error, setError] = useState();
  const [provider, setProvider] = useState();

  async function onProviderSelected(provider: Provider) {
    console.log(provider);
    const web3Connection = new Web3Connection({web3CustomProvider: provider});
    await web3Connection.connect();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      {Connectors.map((wallet) => {
        return <ConnectorCard connector={wallet} error={error} chainIds={Chains} setError={setError} onProviderSelected={onProviderSelected} />
      })}
    </div>
  );
}

export default App;
