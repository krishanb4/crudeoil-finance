import { vaultABI } from '../bscconfigure';
import * as types from '../constants/actionConstants';
import { toast } from 'react-toastify';
import React from 'react';
import Ionicon from 'react-ionicons';
import 'react-toastify/dist/ReactToastify.css';

export const withdraw = async ({ web3, address, amount, pid, contractAddress, dispatch }) => {
  const contract = new web3.eth.Contract(vaultABI, contractAddress);
  const data = await _withdraw({ web3, contract, amount, address, pid, dispatch });
  return data;
};

const _withdraw = ({ web3, contract, address, pid, amount, dispatch }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .withdraw(pid, amount)
      .send({ from: address })
      .on('transactionHash', function(hash) {
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
      .on('receipt', function(receipt) {
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
      .on('error', function(error) {
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
