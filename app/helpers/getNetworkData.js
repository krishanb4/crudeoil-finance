import { connectors } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { bscPools, bscStakePools } from '../bscconfigure';

export const getNetworkPools = () => {
  return bscPools;
};

export const getNetworkStakePools = () => {
  return bscStakePools;
};

export const getNetworkStables = () => {
  return ['BUSD', 'USDT', 'USDC', 'DAI', 'VAI', 'QUSD', 'UST', 'VENUS BLP', '3EPS'];
};

export const getNetworkMultiCall = () => {
  //return '0xB94858b0bB5437498F5453A16039337e5Fdc269C';
  return '0x2a5De02CD1feDc31CdcEa1b844433f26a829bD97';
};

export const getNetworkConnectors = networkId => {
  return {
    network: 'binance',
    cacheProvider: true,
    providerOptions: {
      injected: {
        display: {
          name: 'Injected',
          description: 'Home-BrowserWallet',
        },
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            1: 'https://bsc-dataseed.binance.org/',
            56: 'https://bsc-dataseed.binance.org/',
            97 : 'https://data-seed-prebsc-1-s1.binance.org:8545/'
          },
        },
      },
      'custom-binance': {
        display: {
          name: 'Binance',
          description: 'Binance Chain Wallet',
          logo: require(`../wallets/binance-wallet.png`),
        },
        package: 'binance',
        connector: async (ProviderPackage, options) => {
          const provider = window.BinanceChain;
          await provider.enable();
          return provider;
        },
      },
      'custom-math': {
        display: {
          name: 'Math',
          description: 'Math Wallet',
          logo: require(`../wallets/math-wallet.svg`),
        },
        package: 'math',
        connector: connectors.injected,
      },
      'custom-twt': {
        display: {
          name: 'Trust',
          description: 'Trust Wallet',
          logo: require(`../wallets/trust-wallet.svg`),
        },
        package: 'twt',
        connector: connectors.injected,
      },
      'custom-safepal': {
        display: {
          name: 'SafePal',
          description: 'SafePal App',
          logo: require(`../wallets/safepal-wallet.svg`),
        },
        package: 'safepal',
        connector: connectors.injected,
      },
    },
  };
};
