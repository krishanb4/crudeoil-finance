import { vaultABI } from '../bscconfigure';
import * as types from '../constants/actionConstants';

export const harvest = async ({ web3, address, pid, vaultContractAddress, dispatch }) => {
  
  const strategyContract = new web3.eth.Contract(vaultABI, vaultContractAddress);
  const data = await _harvest({ contract: strategyContract, pid, address, dispatch });
  return data;
};

const _harvest = ({ contract, address, pid, dispatch }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .withdraw(pid, 0)
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log(hash);
        dispatch({
          type: types.OPEN_TOAST,
          items: { type: 'success', hash: hash, message: 'Transaction Pending' }
        });
        const txn = {
          txnId: hash,
          status: 'pending',
          time : new Date().getTime()
        };
        dispatch({
          type: types.SAVE_TXNS,
          item: txn
        });
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
        const txn = {
          txnId: receipt.transactionHash,
          status: 'success',
          time : new Date().getTime()
        };
        dispatch({
          type: types.UPDATE_TXNS,
          item: txn
        });
        resolve();
      })
      .on('error', function (error) {
        console.log(error);
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
        console.log(error);
        reject(error);
      });
  });
};
