import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {ConnectorButton} from "../../../../lib";
import {ModalModes} from "../../../../lib/types/wallet-selector";
import ethereum from "../../../../__mocks__/ethereum";
import _Connector from "../../../../__mocks__/connector/connector";

describe(`ConnectorButton`, () => {
  beforeAll(() => {
    window.ethereum = ethereum as any;
  });

  it(`Errors because no provider`, async () => {

    let error: Error | undefined = undefined;
    let isActive = false;
    let activeChainId = 0;

    const onConnectorDisconnect =
      jest.fn();

    const onConnectorConnect =
      jest.fn();

    const startActivation =
      jest.fn();

    const setError =
      jest.fn().mockImplementation((e?: Error | undefined) => {
        error = e;
      });

    const update =
      jest.fn().mockImplementation(({chainId}) => {
        activeChainId = chainId;
        isActive = !!chainId;
        error = undefined;
      });

    const resetState =
      jest.fn().mockImplementation(() => {
        activeChainId = 0;
        isActive = false;
        error = undefined;
      });


    const _connector = new _Connector({update, resetState, startActivation}, setError)


    const button = () => <ConnectorButton connector={_connector}
                                          setError={setError}
                                          error={error}
                                          isActive={isActive}
                                          activeChainId={activeChainId}
                                          onConnectorConnect={onConnectorConnect}
                                          onConnectorDisconnect={onConnectorDisconnect}
                                          variant={ModalModes.Sidebar}/>

    const {rerender} = render(button());

    fireEvent.click(screen.getByText(/Unnamed Implementation/));

    await waitFor(() => {
      expect(setError).toHaveBeenCalled();
    });

    rerender(button());

    await waitFor(() => {
      expect(screen.getByRole("button", {name: /try again\?/})).toBeInTheDocument();
    });

  })
})