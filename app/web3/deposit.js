import { vaultABI } from '../bscconfigure';
import * as types from '../constants/actionConstants';
import { toast } from 'react-toastify';
import React from 'react';
import Ionicon from 'react-ionicons';
import 'react-toastify/dist/ReactToastify.css';

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
        const PendingMsg = () => (
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <Ionicon icon="ios-alert-outline" /> 
              <span style={{ marginLeft: 5}}>Transaction Pending</span>
            </div>
            <div style={{ marginLeft: 28}}> Confirmation is in progress. Check your transction on 
              <span style={{ cursor: 'pointer', color: '#2b2d80', fontWeight: 600, marginLeft: 5}} onClick={() => window.open(`https://bscscan.com/tx/${hash}`, '_blank')}>here</span>
            </div>
          </div>
        )
        toast.warn(PendingMsg);        
        // dispatch({
        //   type: types.OPEN_TOAST,
        //   items: { type: 'warning', hash: hash, message: 'Transaction Pending' }
        // });
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
