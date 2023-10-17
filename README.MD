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
import {WalletSelector, ConnectorsNames} from "@layerx-labs/dappkit-react";

const [showModal, setShowModal] = useState(false);
// .. your component
<WalletSelector modalCloseClicked={() => setShowModal(false)}
                showWallets={[ConnectorsNames.Metamask, ConnectorsNames.Coinbase]}
                showModal={showModal}/>
```
> On wallet selection, `WalletSelector` component will update the values of useDappkitConnection/Info()

**Supported Wallets**

| wallet            | `ConnectorsNames`  |
|:------------------|:-------------------|
| Coinbase          | Coinbase           |
| Metamask          | Metamask           |
| Safe              | GnosisSafe         |
| Wallet Connect v2 | WalletConnect      |

### Sharing your connection with other dappkit classes

```ts
import {ERC20} from "@taikai/dappkit";
import {useDappkitConnection} from "@layerx-labs/dappkit-react";
import {useEffect, useState} from "react";

function useERC20(tokenAddress: string) {
  const [token, setToken] = useState<ERC20 | null>(null);

  const {connection} = useDappkitConnection();

  useEffect(() => {
    if (!connection) {
      setToken(null);
      return;
    }

    setToken(new ERC20(connection, "0xTokenAddress"));
  }, [connection]);

  function sendToken(amount: number, address: string) {
    if (!token)
      return;

    return token.transferTokenAmount(address, amount);
  }
  
  return {token, sendToken};
}
```