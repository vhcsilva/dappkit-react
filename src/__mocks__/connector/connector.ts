import {Actions, Connector} from "@web3-react/types";

export default class _Connector extends Connector {
  constructor(readonly actions: Actions, readonly setError: ((error: Error|undefined) => void)) {
    super(actions, setError);
  }

  activate(): Promise<void> | void {
    this.actions.update({chainId: 1});
  }

  deactivate(): Promise<void> | void {
    this.actions.resetState();
  }
}