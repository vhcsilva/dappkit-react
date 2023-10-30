import {MetamaskButton} from "../../../../../lib";
import {ModalModes} from "../../../../../lib/types/wallet-selector";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import React from "react";
import ethereum from "../../../../../__mocks__/ethereum";
import {useConnectorHooks} from "../../../../../lib/custom-hooks/use-connector-hooks";


beforeAll(() => {
  window.ethereum = ethereum as any;
});

jest.mock('../../../../../lib/custom-hooks/use-connector-hooks', () => ({
  useConnectorHooks: jest.fn().mockReturnValue({
    isActive: false,
    chainId: 0
  })
}))

test(`MetamaskButton`, async () => {

  const onConnectorConnect = jest.fn();
  const onConnectorDisconnect = jest.fn();

  const button = () => <MetamaskButton  onConnectorConnect={onConnectorConnect}
                                        onConnectorDisconnect={onConnectorDisconnect}
                                        variant={ModalModes.Sidebar}/>

  const {rerender} = render(button());

  fireEvent.click(screen.getByText(/Metamask/));

  useConnectorHooks.mockReturnValue({isActive: true, chainId: 1})

  await waitFor(() => {
    expect(onConnectorConnect).toHaveBeenCalled();
  })

  await waitFor(() => {
    expect(screen.getByRole("button", {name: /Disconnect/})).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Disconnect/));
  rerender(button());

  await waitFor(() => {
    expect(onConnectorConnect).toHaveBeenCalled();
  })
})