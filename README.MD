# @layerx-labs/dappkit-react
```bash
$ npm install -s @layerx-labs/dappkit-react
```

## Usage

### Custom Hooks
```tsx
// ... your component
import {useDappkitConnection, useDappkitConnectionInfo} from "./use-dappkit";

const {connection} = useDappkitConnection();
const {address, chainId, connected} = useDappkitConnectionInfo();
```

### Wallet selector
```tsx
// .. your component
<WalletSelector show={["metamask", "coinbase", "gnosis"]} />
```