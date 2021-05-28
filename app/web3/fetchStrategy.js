import { vaultABI } from '../bscconfigure';

export const fetchStrategy = async ({ web3, contractAddress, pid }) => {
  const contract = new web3.eth.Contract(vaultABI, contractAddress);
  const strategy = await contract.methods.poolInfo(pid).call();
  return strategy.strat.toString();
};
