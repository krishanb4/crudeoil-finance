import * as types from '../constants/actionConstants';
import {
  ConnectingToWallet,
  ConnectedToWallet,
  ConnectedToWalletWithError,
  DisConnectingToWallet,
  DisConnectedToWallet,
  DisConnectedToWalletWithError,
  WalletAccountChanged,
  WalletNetworkChanged,
} from 'dan-actions/CommonActions';
import Web3 from 'web3';

export function connectWallet(web3Modal) {
  return async dispatch => {
    dispatch(ConnectingToWallet());
     _connectWallet(dispatch,web3Modal);
     document.getElementsByClassName('web3modal-modal-lightbox')[0].style.zIndex = '9999';
  };
}

export function disconnectWallet(web3, web3Modal) {
  return dispatch => {
    dispatch(DisConnectingToWallet());

    const promise = new Promise(async (resolve, reject) => {
      try {
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
          await web3.currentProvider.close();
        }
        await web3Modal.clearCachedProvider();
        dispatch(DisConnectedToWallet());
        resolve();
      } catch (error) {
        dispatch(DisConnectedToWalletWithError());
        reject(error);
      }
    });
    return promise;
  };
}

export const detailAction = item => ({
  type: types.SHOW_DETAIL_SHOP,
  item,
});

export const fetchAction = items => ({
  type: types.FETCH_SHOP_DATA,
  items,
});

async function _connectWallet(dispatch, web3Modal) {
  try {  
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    web3.eth.extend({
      methods: [
        {
          name: 'chainId',
          call: 'eth_chainId',
          outputFormatter: web3.utils.hexToNumber,
        },
      ],
    });
    const subscribeProvider = provider => {
      if (!provider.on) {
        return;
      }
      provider.on('close', () => {
        dispatch(disconnectWallet(web3, web3Modal));
      });
      provider.on('disconnect', async () => {
        dispatch(disconnectWallet(web3, web3Modal));
      });
      provider.on('accountsChanged', async accounts => {
        if (accounts[0]) {
          dispatch({ type: HOME_ACCOUNTS_CHANGED, data: accounts[0] });
        } else {
          dispatch(disconnectWallet(web3, web3Modal));
        }
      });
      provider.on('chainChanged', async chainId => {
        const networkId = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
        dispatch({ type: HOME_NETWORK_CHANGED, data: networkId });
      });
    };
    subscribeProvider(provider);

    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    let networkId = await web3.eth.getChainId();
    if (networkId === 86) {
      // Trust provider returns an incorrect chainId for BSC.
      networkId = 56;
    }

    dispatch(ConnectedToWallet({ web3, address, networkId }));
  } catch (error) {
    console.log(error);
    dispatch(ConnectedToWalletWithError());
  }
}
