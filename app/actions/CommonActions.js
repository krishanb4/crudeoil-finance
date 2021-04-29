import * as types from '../constants/actionConstants';

export const serverInvokingStartedAction = items => ({
  type: types.SERVER_INVOKING_STARTED,
  items,
});

export const serverInvokingStoppedAction = items => ({
    type: types.SERVER_INVOKING_STOPPED,
    items,
  });
  
  
export const ConnectingToWallet = items => ({
  type: types.HOME_CONNECT_WALLET_BEGIN,
  items,
});

export const ConnectedToWallet = items => ({
  type: types.HOME_CONNECT_WALLET_SUCCESS,
  items,
});

export const ConnectedToWalletWithError = items => ({
  type: types.HOME_CONNECT_WALLET_FAILURE,
  items,
});

export const DisConnectingToWallet = items => ({
  type: types.HOME_DISCONNECT_WALLET_BEGIN,
  items,
});

export const DisConnectedToWallet = items => ({
  type: types.HOME_DISCONNECT_WALLET_SUCCESS,
  items,
});

export const DisConnectedToWalletWithError = items => ({
  type: types.HOME_DISCONNECT_WALLET_FAILURE,
  items,
});

export const WalletNetworkChanged = items => ({
  type: types.HOME_NETWORK_CHANGED,
  items,
});

export const WalletAccountChanged = items => ({
  type: types.HOME_ACCOUNTS_CHANGED,
  items,
});