import { vaultABI } from '../bscconfigure';

export const fetchStrategy = async ({ web3, contractAddress }) => {
  const contract = new web3.eth.Contract(vaultABI, contractAddress);
  const strategy = await contract.methods.strategy().call();
  return strategy.toString();
};
