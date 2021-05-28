import { erc20ABI } from '../bscconfigure';
import BigNumber from 'bignumber.js';
import * as types from '../constants/actionConstants';
import { toast } from 'react-toastify';
import React from 'react';
import Ionicon from 'react-ionicons';
import 'react-toastify/dist/ReactToastify.css';

export const approval = ({ web3, address, tokenAddress, contractAddress, dispatch }) => {
  return new Promise((resolve, reject) => {
    const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

    contract.methods
      .approve(contractAddress, web3.utils.toWei('80000000000', 'ether'))
      .send({ from: address })
      .on('transactionHash', function (hash) {
        // dispatch({
        //   type: types.OPEN_TOAST,
        //   items: { type: 'success', hash: hash, message: 'Transaction Pending' }
        // });
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
        console.log(hash);
      })
      .on('receipt', function (receipt) {
        resolve(new BigNumber(80000000000).toNumber());
      })
      .on('error', function (error) {
        reject(error);
      })
      .catch(error => {
        reject(error);
      });
  });
};
