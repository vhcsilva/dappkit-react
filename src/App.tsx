import React, {useState} from 'react';
import './App.css';
import {WalletSelector} from "./lib";
import {Button} from "@taikai/rocket-kit";
import {ConnectorsNames} from "./lib/types/connectors";

function App() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <div className="App-header">
        <Button action={() => setShowModal(!showModal)} value="Show wallet selector" />
        <WalletSelector modalCloseClicked={() => setShowModal(false)}
                        showWallets={[ConnectorsNames.Metamask, ConnectorsNames.Coinbase, ConnectorsNames.GnosisSafe]}
                        showModal={showModal} />
      </div>
    </div>
  );
}

export default App;
