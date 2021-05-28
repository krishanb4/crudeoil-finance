import { vaultABI } from '../bscconfigure';
import * as types from '../constants/actionConstants';

export const deposit = async ({ web3, address, pid, amount, contractAddress, dispatch }) => {
  const contract = new web3.eth.Contract(vaultABI, contractAddress);
  const data = await _deposit({ web3, contract, amount, pid, address, dispatch });
  return data;
};

const _deposit = ({ web3, contract, amount, pid, address, dispatch }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .deposit(pid, amount)
      .send({ from: address })
      .on('transactionHash', function(hash) {
        console.log(hash);        
        dispatch({
          type: types.OPEN_TOAST,
          items: { type: 'warning', hash: hash, message: 'Transaction Pending' }
        });
      })
      .on('receipt', function(receipt) {
        console.log(receipt);
        resolve();
      })
      .on('error', function(error) {
        console.log(error);
        reject(error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
