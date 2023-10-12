# @layerx-labs/dappkit-react
```bash
$ npm install -s @layerx-labs/dappkit-react
```

## Usage

### Custom Hooks
```tsx
import {useDappkitConnection, useDappkitConnectionInfo} from "./use-dappkit";
// ... your component

// share this connection with your other dappkit classes
const {connection} = useDappkitConnection();

// check connection address, chainId and connected status
const {address, chainId, connected} = useDappkitConnectionInfo(); 
```

### Wallet selector
```tsx
const [showModal, setShowModal] = useState(false);
// .. your component
<WalletSelector modalCloseClicked={() => setShowModal(false)}
                showWallets={["coinbase", "metamask", "gnosis"]}
                showModal={showModal} />

// On wallet selection, WalletSelector plugin will change the values and connection of useDappkitConnection/Info()
```