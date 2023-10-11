# @layerx-labs/dappkit-react
```bash
$ npm install -s @layerx-labs/dappkit-react
```

## Usage

### Custom Hooks
```tsx
// ... your component
import {useDappkitConnection, useDappkitConnectionInfo} from "./use-dappkit";

const {connection} = useDappkitConnection(); // share this with your other dappkit classes
const {address, chainId, connected} = useDappkitConnectionInfo(); // check connection address, chainId and connected status
```

### Wallet selector
```tsx
// .. your component
<WalletSelector show={["metamask", "coinbase", "gnosis"]} />
// On wallet selection, WalletSelector plugin will change the values and connection of useDappkitConnection/Info()
```