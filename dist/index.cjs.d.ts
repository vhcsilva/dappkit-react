/// <reference types="react" />
import { Connector } from "@web3-react/types";
import { ReactNode } from "react";
import { provider as Provider } from "web3-core";
import { Web3Connection } from "@taikai/dappkit";
declare enum ConnectorsNames {
    Coinbase = "Coinbase",
    Metamask = "Metamask",
    GnosisSafe = "GnosisSafe",
    WalletConnect = "WalletConnect"
}
declare enum ModalModes {
    Modal = "modal",
    Sidebar = "sidebar"
}
type WalletSelectorProps = {
    showWallets: ConnectorsNames[];
    showModal: boolean;
    modalCloseClicked: () => void;
    modalTitle?: string;
    mode?: ModalModes;
};
type CustomConnectorButtonProps = {
    onConnectorConnect(p: Provider): void;
    onConnectorDisconnect(): void;
    variant: ModalModes;
};
type Props = {
    connector: Connector;
    setError: (e?: Error) => void;
    error: Error | undefined;
    isActive: boolean;
    activeChainId: number;
    logo?: ReactNode;
};
type ConnectorButtonProps = Props & CustomConnectorButtonProps;
declare function ConnectorButton({ activeChainId, setError, connector, isActive, error, onConnectorConnect, logo, onConnectorDisconnect, variant }: ConnectorButtonProps): import("react/jsx-runtime").JSX.Element;
declare function CoinbaseButton({ onConnectorConnect, onConnectorDisconnect, variant }: CustomConnectorButtonProps): import("react/jsx-runtime").JSX.Element;
declare function MetamaskButton({ onConnectorConnect, onConnectorDisconnect, variant }: CustomConnectorButtonProps): import("react/jsx-runtime").JSX.Element;
declare function GnosisSafeButton({ onConnectorConnect, onConnectorDisconnect, variant }: CustomConnectorButtonProps): import("react/jsx-runtime").JSX.Element;
declare function WalletSelector({ showWallets, showModal, modalCloseClicked, modalTitle, mode }: WalletSelectorProps): import("react/jsx-runtime").JSX.Element;
type UseDappkit = {
    setProvider(p: Provider): void;
    initializeConnection(): void;
    disconnect(): void;
    provider: Provider | null;
    connection: Web3Connection | null;
};
declare const useDappkit: import("zustand").UseBoundStore<import("zustand").StoreApi<UseDappkit>>;
declare const useDappkitConnection: () => {
    connection: Web3Connection | null;
};
declare const useDappkitConnectionInfo: () => {
    chainId: number;
    address: string;
    connected: boolean;
};
export { ConnectorButton, CoinbaseButton, MetamaskButton, GnosisSafeButton, WalletSelector, useDappkit, useDappkitConnection, useDappkitConnectionInfo, ConnectorsNames };
