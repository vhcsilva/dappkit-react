'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var coinbaseWallet$1 = require('@web3-react/coinbase-wallet');
var metamask = require('@web3-react/metamask');
var gnosisSafe$1 = require('@web3-react/gnosis-safe');
var styled = require('styled-components');
var core = require('@web3-react/core');
var zustand = require('zustand');
var dappkit = require('@taikai/dappkit');
var shallow = require('zustand/react/shallow');
var rocketKit = require('@taikai/rocket-kit');
var walletconnectV2 = require('@web3-react/walletconnect-v2');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

exports.ConnectorsNames = void 0;
(function (ConnectorsNames) {
    ConnectorsNames["Coinbase"] = "Coinbase";
    ConnectorsNames["Metamask"] = "Metamask";
    ConnectorsNames["GnosisSafe"] = "GnosisSafe";
    ConnectorsNames["WalletConnect"] = "WalletConnect";
})(exports.ConnectorsNames || (exports.ConnectorsNames = {}));

function getConnectorName(connector) {
    if (connector instanceof coinbaseWallet$1.CoinbaseWallet)
        return exports.ConnectorsNames.Coinbase;
    if (connector instanceof metamask.MetaMask)
        return exports.ConnectorsNames.Metamask;
    if (connector instanceof gnosisSafe$1.GnosisSafe)
        return exports.ConnectorsNames.GnosisSafe;
}

var ModalModes;
(function (ModalModes) {
    ModalModes["Modal"] = "modal";
    ModalModes["Sidebar"] = "sidebar";
})(ModalModes || (ModalModes = {}));

const Action = styled__default.default.button `
    width: ${(props) => props.variant === ModalModes.Sidebar ? 392 : 163}px;
    height: 36px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #D9D4ED;
    gap: 8px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-shrink: 1;
    &:hover {
      cursor: pointer;
      background-color: rgba(0,0,0, .05)
    }`;
function ConnectorButton({ activeChainId, setError, connector, isActive, error, onConnectorConnect, logo, onConnectorDisconnect, variant }) {
    const [desiredChainId, setDesiredChainId] = react.useState(undefined);
    const switchChain = react.useCallback(async (_desiredChainId) => {
        var _a;
        try {
            if ((_desiredChainId === activeChainId) || (_desiredChainId === -1 && activeChainId !== undefined)) {
                setError(undefined);
                return;
            }
            await connector.activate(_desiredChainId);
            if (connector.provider)
                onConnectorConnect === null || onConnectorConnect === void 0 ? void 0 : onConnectorConnect(connector.provider);
            else
                throw new Error(`Failed to get a provider, make sure your connector has one!`);
        }
        catch (e) {
            (_a = connector === null || connector === void 0 ? void 0 : connector.resetState) === null || _a === void 0 ? void 0 : _a.call(connector);
            setError(e);
        }
    }, [connector, activeChainId, setError, onConnectorConnect]);
    async function retry() {
        await switchChain(desiredChainId);
    }
    async function onDisconnectClick() {
        if (connector === null || connector === void 0 ? void 0 : connector.deactivate)
            void connector.deactivate();
        else
            void (connector === null || connector === void 0 ? void 0 : connector.resetState());
        setDesiredChainId(undefined);
        onConnectorDisconnect === null || onConnectorDisconnect === void 0 ? void 0 : onConnectorDisconnect();
    }
    async function onSelectChain(selected) {
        await switchChain(selected);
    }
    return jsxRuntime.jsx("div", Object.assign({ style: { margin: "1rem 0 0", display: "inline-flex", alignItems: "center" } }, { children: isActive
            ? error
                ? (jsxRuntime.jsx(Action, { variant: variant, onClick: () => retry(), children: "try again?" }))
                : (jsxRuntime.jsx(Action, { variant: variant, onClick: () => onDisconnectClick(), children: "Disconnect" }))
            : (jsxRuntime.jsx(Action, { variant: variant, onClick: () => onSelectChain(1), children: error ? "try again?" : jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [logo, " ", getConnectorName(connector) || "Unnamed Implementation"] }) })) }));
}

const Chains = [
    {
        label: 'Ether',
        symbol: 'ETH',
        decimals: 18,
        value: "1",
        urls: ["https://cloudflare-eth.com"]
    },
    {
        label: 'Mumbai',
        symbol: 'MATIC',
        decimals: 18,
        value: "80001",
        urls: ["https://polygon-mumbai-bor.publicnode.com"]
    }
];

const [coinbaseWallet, hooks$3] = core.initializeConnector((actions) => new coinbaseWallet$1.CoinbaseWallet({ actions, options: { url: Chains[0].urls[0], appName: process.env.APP_NAME || "@taikai/dappkit" } }));

function useConnectorHooks(hooks) {
    const { useIsActivating, useIsActive, useChainId, } = hooks;
    const chainId = useChainId();
    const isActivating = useIsActivating();
    const isActive = useIsActive();
    const [error, setError] = react.useState(undefined);
    return { chainId, isActivating, isActive, error, setError };
}

const useDappkit = zustand.create((set, get) => ({
    setProvider: (provider) => set(() => ({ provider, connection: null })),
    initializeConnection: () => set(() => ({ connection: new dappkit.Web3Connection({ web3CustomProvider: get().provider }) })),
    disconnect: () => {
        var _a, _b;
        if (!get().provider)
            return;
        if ((_a = get().provider) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("disconnect"))
            (_b = get().provider) === null || _b === void 0 ? void 0 : _b.disconnect();
        set(() => ({ connection: null, provider: null }));
    },
    provider: null,
    connection: null,
}));
const useDappkitConnection = () => useDappkit(shallow.useShallow(({ connection }) => ({ connection })));
const useDappkitConnectionInfo = () => {
    const [chainId, setChainId] = react.useState(0);
    const [address, setAddress] = react.useState("");
    const [connected, setConnected] = react.useState(false);
    const { connection } = useDappkitConnection();
    const connect = react.useCallback(async () => {
        if (!connection) {
            setAddress("");
            setChainId(0);
            setConnected(false);
            return;
        }
        const _address = await connection.getAddress();
        setChainId(await connection.getETHNetworkId());
        setAddress(_address);
        setConnected(!!_address);
    }, [connection]);
    react.useEffect(() => { connect(); }, [connection]);
    return { chainId, address, connected };
};

var Logo$3 = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<g clip-path=\"url(#clip0_925_234)\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.33248 0H12.6669C14.5082 0 16 1.60512 16 3.58528V12.4147C16 14.3949 14.5082 16 12.6675 16H3.33248C1.49184 16 0 14.3949 0 12.4147V3.58528C0 1.60512 1.49184 0 3.33248 0Z\" fill=\"#0052FF\"/>\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8 2.31744C11.1386 2.31744 13.6826 4.86144 13.6826 8C13.6826 11.1386 11.1386 13.6826 8 13.6826C4.86144 13.6826 2.31744 11.1386 2.31744 8C2.31744 4.86144 4.86144 2.31744 8 2.31744Z\" fill=\"white\"/>\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.60033 6.18369H9.39904C9.62945 6.18369 9.81568 6.38464 9.81568 6.63168V9.36768C9.81568 9.61536 9.6288 9.81568 9.39904 9.81568H6.60033C6.36993 9.81568 6.18369 9.61472 6.18369 9.36768V6.63168C6.18369 6.38464 6.37057 6.18369 6.60033 6.18369Z\" fill=\"#0052FF\"/>\r\n</g>\r\n<defs>\r\n<clipPath id=\"clip0_925_234\">\r\n<rect width=\"16\" height=\"16\" fill=\"white\"/>\r\n</clipPath>\r\n</defs>\r\n</svg>";

function CoinbaseButton({ onConnectorConnect, onConnectorDisconnect, variant }) {
    const { isActive, error, setError } = useConnectorHooks(hooks$3);
    const { chainId, connected } = useDappkitConnectionInfo();
    return jsxRuntime.jsx(ConnectorButton, { activeChainId: chainId || 0, logo: jsxRuntime.jsx(Logo$3, {}), variant: variant, setError: setError, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect, connector: coinbaseWallet, isActive: connected && isActive, error: error });
}

const [metamaskWallet, hooks$2] = core.initializeConnector((actions) => new metamask.MetaMask({ actions }));

var Logo$2 = "<svg width=\"18\" height=\"16\" viewBox=\"0 0 18 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<g clip-path=\"url(#clip0_925_187)\">\r\n<path d=\"M16.6711 0L9.3479 5.41862L10.7097 2.22525L16.6711 0Z\" fill=\"#E17726\"/>\r\n<path d=\"M0.41272 0.00637817L6.35812 2.22565L7.65121 5.46089L0.41272 0.00637817Z\" fill=\"#E27625\"/>\r\n<path d=\"M13.724 11.5239L16.9607 11.5855L15.8295 15.4283L11.88 14.3408L13.724 11.5239Z\" fill=\"#E27625\"/>\r\n<path d=\"M3.34263 11.5239L5.17978 14.3409L1.23689 15.4284L0.112579 11.5855L3.34263 11.5239Z\" fill=\"#E27625\"/>\r\n<path d=\"M7.47539 4.63678L7.6077 8.90901L3.64963 8.72893L4.77547 7.03043L4.78972 7.01405L7.47539 4.63678Z\" fill=\"#E27625\"/>\r\n<path d=\"M9.55028 4.58914L12.2769 7.01424L12.291 7.03049L13.4169 8.72899L9.45975 8.90903L9.55028 4.58914Z\" fill=\"#E27625\"/>\r\n<path d=\"M5.29566 11.5363L7.45688 13.2202L4.94635 14.4323L5.29566 11.5363Z\" fill=\"#E27625\"/>\r\n<path d=\"M11.7714 11.536L12.1134 14.4323L9.60995 13.2201L11.7714 11.536Z\" fill=\"#E27625\"/>\r\n<path d=\"M9.66519 13.0614L12.2057 14.2916L9.84252 15.4147L9.86705 14.6724L9.66519 13.0614Z\" fill=\"#D5BFB2\"/>\r\n<path d=\"M7.40076 13.062L7.20681 14.6603L7.22272 15.4138L4.85403 14.2916L7.40076 13.062Z\" fill=\"#D5BFB2\"/>\r\n<path d=\"M6.66714 9.46658L7.33101 10.8618L5.07077 10.1997L6.66714 9.46658Z\" fill=\"#233447\"/>\r\n<path d=\"M10.3994 9.46674L12.0033 10.1996L9.73575 10.8616L10.3994 9.46674Z\" fill=\"#233447\"/>\r\n<path d=\"M5.46842 11.522L5.10306 14.5247L3.14487 11.5877L5.46842 11.522Z\" fill=\"#CC6228\"/>\r\n<path d=\"M11.5984 11.522L13.922 11.5877L11.9565 14.5248L11.5984 11.522Z\" fill=\"#CC6228\"/>\r\n<path d=\"M13.4742 8.55914L11.7831 10.2825L10.4794 9.68674L9.85514 10.999L9.44592 8.74242L13.4742 8.55914Z\" fill=\"#CC6228\"/>\r\n<path d=\"M3.59171 8.55911L7.62065 8.74242L7.21144 10.999L6.58709 9.68691L5.29018 10.2826L3.59171 8.55911Z\" fill=\"#CC6228\"/>\r\n<path d=\"M3.47772 8.20551L5.39094 10.1469L5.45725 12.0635L3.47772 8.20551Z\" fill=\"#E27525\"/>\r\n<path d=\"M13.5909 8.202L11.6078 12.0669L11.6825 10.1469L13.5909 8.202Z\" fill=\"#E27525\"/>\r\n<path d=\"M7.52712 8.3237L7.60412 8.80837L7.79439 10.0158L7.67207 13.7241L7.09373 10.7452L7.09354 10.7143L7.52712 8.3237Z\" fill=\"#E27525\"/>\r\n<path d=\"M9.53853 8.31702L9.97327 10.7144L9.97308 10.7452L9.39329 13.7316L9.37034 12.9846L9.27988 9.9938L9.53853 8.31702Z\" fill=\"#E27525\"/>\r\n<path d=\"M11.8526 10.0697L11.7878 11.7349L9.76954 13.3074L9.36154 13.0191L9.81888 10.6634L11.8526 10.0697Z\" fill=\"#F5841F\"/>\r\n<path d=\"M5.2211 10.0698L7.24775 10.6635L7.70508 13.0191L7.29708 13.3074L5.2787 11.7348L5.2211 10.0698Z\" fill=\"#F5841F\"/>\r\n<path d=\"M4.46786 13.9238L7.05 15.1473L7.03907 14.6248L7.25511 14.4352H9.8107L10.0346 14.6242L10.0181 15.1463L12.5838 13.9269L11.3353 14.9586L9.82563 15.9955H7.23442L5.7257 14.9544L4.46786 13.9238Z\" fill=\"#C0AC9D\"/>\r\n<path d=\"M9.48023 12.8986L9.84531 13.1565L10.0593 14.8635L9.74964 14.6021H7.31794L7.01422 14.8688L7.22114 13.1566L7.58635 12.8986H9.48023Z\" fill=\"#161616\"/>\r\n<path d=\"M16.1876 0.149994L17.0667 2.78716L16.5177 5.45359L16.9086 5.75517L16.3796 6.15876L16.7772 6.46578L16.2507 6.94522L16.5739 7.17927L15.7162 8.18099L12.1982 7.1567L12.1677 7.14036L9.6326 5.00179L16.1876 0.149994Z\" fill=\"#763E1A\"/>\r\n<path d=\"M0.879067 0.149994L7.4341 5.00179L4.89896 7.14036L4.86847 7.1567L1.35045 8.18099L0.492748 7.17927L0.815685 6.94539L0.289501 6.46578L0.686304 6.15909L0.149422 5.75435L0.555086 5.45259L0 2.78726L0.879067 0.149994Z\" fill=\"#763E1A\"/>\r\n<path d=\"M12.0261 6.93268L15.7536 8.01793L16.9647 11.7503L13.7698 11.7503L11.5684 11.7781L13.1693 8.65754L12.0261 6.93268Z\" fill=\"#F5841F\"/>\r\n<path d=\"M5.04054 6.93268L3.89712 8.65754L5.49828 11.7781L3.29796 11.7503H0.108704L1.31293 8.01796L5.04054 6.93268Z\" fill=\"#F5841F\"/>\r\n<path d=\"M10.8923 2.20746L9.84965 5.02338L9.6284 8.82743L9.54374 10.0197L9.53702 13.0656H7.52959L7.52309 10.0255L7.43815 8.82638L7.21679 5.02338L6.17435 2.20746H10.8923Z\" fill=\"#F5841F\"/>\r\n</g>\r\n<defs>\r\n<clipPath id=\"clip0_925_187\">\r\n<rect width=\"17.0667\" height=\"16\" fill=\"white\"/>\r\n</clipPath>\r\n</defs>\r\n</svg>";

function MetamaskButton({ onConnectorConnect, onConnectorDisconnect, variant }) {
    const { isActive, error, setError } = useConnectorHooks(hooks$2);
    const { chainId, connected } = useDappkitConnectionInfo();
    return jsxRuntime.jsx(ConnectorButton, { connector: metamaskWallet, logo: jsxRuntime.jsx(Logo$2, {}), variant: variant, activeChainId: chainId || 0, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect, isActive: connected && isActive, setError: setError, error: error });
}

const [gnosisSafe, hooks$1] = core.initializeConnector((actions) => new gnosisSafe$1.GnosisSafe({ actions }));

var Logo$1 = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<path d=\"M14.1852 7.46154H12.6777C12.2261 7.46154 11.8629 7.8583 11.8629 8.34433V10.715C11.8629 11.2043 11.4967 11.5978 11.0481 11.5978H5.04556C4.59392 11.5978 4.23077 11.9945 4.23077 12.4806V14.1172C4.23077 14.6065 4.59697 15 5.04556 15H11.393C11.8446 15 12.2017 14.6032 12.2017 14.1172V12.8079C12.2017 12.3186 12.5678 11.9747 13.0164 11.9747H14.1852C14.6369 11.9747 15 11.5779 15 11.0919V8.33772C15 7.84507 14.6338 7.46154 14.1852 7.46154Z\" fill=\"black\"/>\r\n<path d=\"M4.13886 4.67488C4.13886 4.25489 4.50527 3.9172 4.95411 3.9172H10.954C11.4059 3.9172 11.7692 3.57667 11.7692 3.15952V1.75768C11.7692 1.33769 11.4028 1 10.954 1H4.60603C4.15413 1 3.79078 1.34053 3.79078 1.75768V2.83886C3.79078 3.25884 3.42437 3.59653 2.97553 3.59653H1.81525C1.36335 3.59653 1 3.93706 1 4.35421V6.72089C1 7.14087 1.3664 7.46154 1.8183 7.46154H3.32667C3.77857 7.46154 4.14192 7.12101 4.14192 6.70386L4.13886 4.67488Z\" fill=\"black\"/>\r\n<path d=\"M7.25864 6.38461H8.74136C9.22519 6.38461 9.61538 6.77793 9.61538 7.25864V8.74136C9.61538 9.22519 9.22207 9.61538 8.74136 9.61538H7.25864C6.7748 9.61538 6.38461 9.22207 6.38461 8.74136V7.25864C6.38461 6.7748 6.77792 6.38461 7.25864 6.38461Z\" fill=\"black\"/>\r\n</svg>";

function GnosisSafeButton({ onConnectorConnect, onConnectorDisconnect, variant }) {
    const { isActive, error, setError } = useConnectorHooks(hooks$1);
    const { chainId, connected } = useDappkitConnectionInfo();
    return jsxRuntime.jsx(ConnectorButton, { connector: gnosisSafe, logo: jsxRuntime.jsx(Logo$1, {}), variant: variant, activeChainId: chainId || 0, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect, isActive: connected && isActive, setError: setError, error: error });
}

const WALLET_CONNECT_PROJECT_ID = process.env.WALLET_CONNECT_PROJECT_ID;
const [walletConnect, hooks] = core.initializeConnector(actions => new walletconnectV2.WalletConnect({
    actions,
    options: { projectId: WALLET_CONNECT_PROJECT_ID, chains: [1], showQrModal: true }
}));

var Logo = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8 0C12.4187 0 16 3.58125 16 8C16 12.4187 12.4187 16 8 16C3.58125 16 0 12.4187 0 8C0 3.58125 3.58125 0 8 0Z\" fill=\"url(#paint0_radial_925_243)\"/>\r\n<path d=\"M5.08438 6.17813C6.69376 4.60625 9.30626 4.60625 10.9156 6.17813L11.1094 6.36875C11.1906 6.44688 11.1906 6.575 11.1094 6.65313L10.4469 7.3C10.4063 7.34063 10.3406 7.34063 10.3 7.3L10.0344 7.04063C8.90938 5.94375 7.09063 5.94375 5.96563 7.04063L5.68126 7.31875C5.64063 7.35938 5.57501 7.35938 5.53438 7.31875L4.87188 6.67188C4.79063 6.59375 4.79063 6.46563 4.87188 6.3875L5.08438 6.17813ZM12.2875 7.51563L12.8781 8.09063C12.9594 8.16875 12.9594 8.29688 12.8781 8.375L10.2188 10.9719C10.1375 11.05 10.0063 11.05 9.92813 10.9719L8.04063 9.12813C8.02188 9.10938 7.98751 9.10938 7.96876 9.12813L6.08126 10.9719C6.00001 11.05 5.86876 11.05 5.79063 10.9719L3.12188 8.375C3.04063 8.29688 3.04063 8.16875 3.12188 8.09063L3.71251 7.51563C3.79376 7.4375 3.92501 7.4375 4.00313 7.51563L5.89063 9.35938C5.90938 9.37813 5.94376 9.37813 5.96251 9.35938L7.85001 7.51563C7.93126 7.4375 8.06251 7.4375 8.14063 7.51563L10.0281 9.35938C10.0469 9.37813 10.0813 9.37813 10.1 9.35938L11.9875 7.51563C12.075 7.4375 12.2063 7.4375 12.2875 7.51563Z\" fill=\"white\"/>\r\n<defs>\r\n<radialGradient id=\"paint0_radial_925_243\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(4.95911e-05 8.00025) scale(16)\">\r\n<stop stop-color=\"#5D9DF6\"/>\r\n<stop offset=\"1\" stop-color=\"#006FFF\"/>\r\n</radialGradient>\r\n</defs>\r\n</svg>";

function WalletConnectButton({ onConnectorConnect, onConnectorDisconnect, variant }) {
    const { isActive, error, setError } = useConnectorHooks(hooks);
    const { chainId, connected } = useDappkitConnectionInfo();
    return jsxRuntime.jsx(ConnectorButton, { connector: walletConnect, logo: jsxRuntime.jsx(Logo, {}), variant: variant, activeChainId: chainId || 0, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect, isActive: connected && isActive, setError: setError, error: error });
}

const GlobalStyles = styled.createGlobalStyle `html {
    --vh: 10px !important;
  }`;
const GridRowFlexWrap = styled__default.default(rocketKit.GridRow) `
    flex-wrap: wrap;
    ${(props) => props.variant === ModalModes.Modal ? "gap: 10px" : ""}
  `;
const GridColNoGrowVariant = styled__default.default(rocketKit.GridCol) `
    ${(props) => props.variant === ModalModes.Modal ? "flex-grow: 0" : ""}
  `;
function WalletSelector({ showWallets, showModal, modalCloseClicked = (() => {
}), modalTitle = "Select a wallet", mode = ModalModes.Sidebar }) {
    const { setProvider, initializeConnection } = useDappkit(({ setProvider, initializeConnection }) => ({ setProvider, initializeConnection }));
    const { address } = useDappkitConnectionInfo();
    async function onConnectorConnect(provider) {
        setProvider(null);
        setProvider(provider);
        initializeConnection();
    }
    async function onConnectorDisconnect() {
        setProvider(null);
        window.location.reload();
    }
    function renderModalChildren() {
        return jsxRuntime.jsxs(rocketKit.GridContainer, { children: [jsxRuntime.jsx(rocketKit.GridRow, { children: jsxRuntime.jsx(rocketKit.GridCol, Object.assign({ className: "wallet-connected-address" }, { children: address })) }), !showWallets.length ? jsxRuntime.jsx(rocketKit.GridRow, { children: jsxRuntime.jsx(rocketKit.GridCol, { children: "No allowed list provided" }) }) : null, jsxRuntime.jsxs(GridRowFlexWrap, Object.assign({ variant: mode }, { children: [showWallets.includes(exports.ConnectorsNames.Coinbase) ?
                            jsxRuntime.jsx(GridColNoGrowVariant, { variant: mode, children: jsxRuntime.jsx(CoinbaseButton, { variant: mode, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect }) }) : null, showWallets.includes(exports.ConnectorsNames.Metamask) ?
                            jsxRuntime.jsx(GridColNoGrowVariant, { variant: mode, children: jsxRuntime.jsx(MetamaskButton, { variant: mode, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect }) }) : null, showWallets.includes(exports.ConnectorsNames.GnosisSafe) ?
                            jsxRuntime.jsx(GridColNoGrowVariant, { variant: mode, children: jsxRuntime.jsx(GnosisSafeButton, { variant: mode, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect }) }) : null, showWallets.includes(exports.ConnectorsNames.WalletConnect) ?
                            jsxRuntime.jsx(GridColNoGrowVariant, { variant: mode, children: jsxRuntime.jsx(WalletConnectButton, { variant: mode, onConnectorConnect: onConnectorConnect, onConnectorDisconnect: onConnectorDisconnect }) }) : null] }))] });
    }
    return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(GlobalStyles, {}), jsxRuntime.jsx("div", Object.assign({ className: "wallet-selector-container" }, { children: mode === ModalModes.Modal
                    ? jsxRuntime.jsx(rocketKit.Modal, { isShowing: showModal, hide: modalCloseClicked, title: modalTitle, children: renderModalChildren(), footer: false })
                    : jsxRuntime.jsx(rocketKit.ModalDrawer, { isShowing: showModal, hide: modalCloseClicked, title: modalTitle, children: renderModalChildren() }) }))] });
}

exports.CoinbaseButton = CoinbaseButton;
exports.ConnectorButton = ConnectorButton;
exports.GnosisSafeButton = GnosisSafeButton;
exports.MetamaskButton = MetamaskButton;
exports.WalletSelector = WalletSelector;
exports.useDappkit = useDappkit;
exports.useDappkitConnection = useDappkitConnection;
exports.useDappkitConnectionInfo = useDappkitConnectionInfo;
