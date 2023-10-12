import React, {useState} from 'react';
import './App.css';
import {WalletSelector} from "./lib";
import {Button} from "@taikai/rocket-kit";

function App() {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Button action={() => setShowModal(!showModal)} value="Show wallet selector" />
        <WalletSelector modalCloseClicked={() => setShowModal(false)}
                        showWallets={["coinbase", "metamask", "gnosis"]}
                        showModal={showModal} />
      </header>
    </div>
  );
}

export default App;
