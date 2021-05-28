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
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
        resolve();
      })
      .on('error', function (error) {
        console.log(error);
        reject(error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
