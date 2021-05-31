var networkSetting = {
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/'],
  };

  
export const networkSetup = (chainId) => {
    return new Promise((resolve, reject) => {
      const provider = window.ethereum
      if (provider) {
        if (chainId === 56) {
          provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkSetting]
          }).then(resolve).catch(reject)
        } else {
          reject(new Error(`No network settings configured for BSC chain. Chain id : '${chainId}'`))
        }
      } else {
        reject(new Error(`window.ethereum is '${typeof provider}'`))
      }
    })
  }

export const getRpcUrl = () => {
  return networkSetting.rpcUrls[0];
};