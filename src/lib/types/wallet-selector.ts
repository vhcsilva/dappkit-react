import {ConnectorsNames} from "./connectors";

export enum ModalModes {
  Modal = "modal",
  Sidebar = "sidebar"
}

export type WalletSelectorProps = {
  showWallets: ConnectorsNames[];
  showModal: boolean;
  modalCloseClicked:() => void
  modalTitle?: string;
  mode?: ModalModes
}