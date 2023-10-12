export type WalletSelectorProps = {
  showWallets: ("coinbase" | "metamask" | "gnosis" | "wallet-connect2")[];
  showModal: boolean;
  modalCloseClicked:() => void
  modalTitle?: string
}