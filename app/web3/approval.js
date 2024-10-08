import { erc20ABI } from '../bscconfigure';
import BigNumber from 'bignumber.js';
import * as types from '../constants/actionConstants';

export const approval = ({ web3, address, tokenAddress, contractAddress, dispatch }) => {
  return new Promise((resolve, reject) => {
    const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

    contract.methods
      .approve(contractAddress, web3.utils.toWei('80000000000', 'ether'))
      .send({ from: address })
      .on('transactionHash', function (hash) {
        dispatch({
          type: types.OPEN_TOAST,
          items: { type: 'success', hash: hash, message: 'Transaction Pending' }
        });
        const txn = {
          txnId: hash,
          status: 'success',
          time : new Date().getTime()
        };
        dispatch({
          type: types.SAVE_TXNS,
          item: txn
        });
        console.log(hash);
      })
      .on('receipt', function (receipt) {
        const txn = {
          txnId: receipt.transactionHash,
          status: 'success',
          time : new Date().getTime()
        };
        dispatch({
          type: types.UPDATE_TXNS,
          item: txn
        });

        resolve(new BigNumber(80000000000).toNumber());
      })
      .on('error', function (error) {
        if(error.receipt) {
          const txn = {
            txnId: error.receipt.transactionHash,
            status: 'failed',
            time : new Date().getTime()
          };
          dispatch({
            type: types.UPDATE_TXNS,
            item: txn
          });
        }
        
        reject(error);
      })
      .catch(error => {
        reject(error);
      });
  });
};
