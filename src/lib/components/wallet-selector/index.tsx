import {ModalModes, WalletSelectorProps} from "../../types/wallet-selector";
import {useDappkit, useDappkitConnectionInfo} from "../../custom-hooks/use-dappkit";
import {provider as Provider} from "web3-core";
import {CoinbaseButton} from "../connector-button/coinbase";
import {MetamaskButton} from "../connector-button/metamask";
import {GnosisSafeButton} from "../connector-button/gnosis-safe";
import React from "react";
import {GridCol, GridContainer, GridRow, Modal, ModalDrawer} from "@taikai/rocket-kit";
import styled, {createGlobalStyle} from "styled-components";
import {ConnectorsNames} from "../../types/connectors";
import {WalletConnectButton} from "../connector-button/wallect-connect";

const GlobalStyles = createGlobalStyle
  `html {
    --vh: 10px !important;
  }`;

const GridRowFlexWrap =
  styled(GridRow)`
    flex-wrap: wrap;
    ${(props: { variant: ModalModes }) => props.variant === ModalModes.Modal ? "gap: 10px" : ""}
  `;

const GridColNoGrowVariant =
  styled(GridCol)`
    ${(props: { variant: ModalModes }) => props.variant === ModalModes.Modal ? "flex-grow: 0" : ""}
  `;

export function WalletSelector({
                                 showWallets,
                                 showModal,
                                 modalCloseClicked = (() => {
                                 }),
                                 modalTitle = "Select a wallet",
                                 mode = ModalModes.Sidebar
                               }: WalletSelectorProps) {
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
    window.location.reload();
  }

  function renderModalChildren() {
    return <GridContainer>
      <GridRow>
        <GridCol className="wallet-connected-address">{address}</GridCol>
      </GridRow>
      {!showWallets.length ? <GridRow><GridCol>No allowed list provided</GridCol></GridRow> : null}
      <GridRowFlexWrap variant={mode}>
        {showWallets.includes(ConnectorsNames.Coinbase) ?
          <GridColNoGrowVariant variant={mode}
                                children={<CoinbaseButton variant={mode}
                                                          onConnectorConnect={onConnectorConnect}
                                                          onConnectorDisconnect={onConnectorDisconnect}/>}/> : null}
        {showWallets.includes(ConnectorsNames.Metamask) ?
          <GridColNoGrowVariant variant={mode}
                                children={<MetamaskButton variant={mode}
                                                          onConnectorConnect={onConnectorConnect}
                                                          onConnectorDisconnect={onConnectorDisconnect}/>}/> : null}
        {showWallets.includes(ConnectorsNames.GnosisSafe) ?
          <GridColNoGrowVariant variant={mode}
                                children={<GnosisSafeButton variant={mode}
                                                            onConnectorConnect={onConnectorConnect}
                                                            onConnectorDisconnect={onConnectorDisconnect}/>}/> : null}
        {showWallets.includes(ConnectorsNames.WalletConnect) ?
          <GridColNoGrowVariant variant={mode}
                                children={<WalletConnectButton variant={mode}
                                                               onConnectorConnect={onConnectorConnect}
                                                               onConnectorDisconnect={onConnectorDisconnect}/>}/> : null}
      </GridRowFlexWrap>
    </GridContainer>
  }

  return <>
    <GlobalStyles/>
    <div className="wallet-selector-container">
      {mode === ModalModes.Modal
        ? <Modal isShowing={showModal} hide={modalCloseClicked} title={modalTitle}
                 children={renderModalChildren()} footer={false}/>
        : <ModalDrawer isShowing={showModal} hide={modalCloseClicked} title={modalTitle}
                       children={renderModalChildren()}/>
      }
    </div>
  </>
}