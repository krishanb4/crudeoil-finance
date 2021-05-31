import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';

const usePoolsTvl = pools => {
  const [poolsTvl, setPoolsTvl] = useState(0);

  useEffect(() => {
    let globalTvl = 0;

    pools
      .filter(p => p.get('status') === 'active')
      .filter(isUniqueEarnContract)
      .forEach(x => {
        globalTvl += x.get('tvl') * x.get('oraclePrice');
      });

    setPoolsTvl(globalTvl);
  }, [pools]);

  return { poolsTvl };
};

const useUserTvl = (pools, tokens) => {
  const [userTvl, setUserTvl] = useState(0);

  useEffect(() => {
    let userTvlAmount = 0;

    pools.forEach(pool => {      
      const depositedAmount = new BigNumber(pool.get('deposited'));
      if (depositedAmount > 0) {
        userTvlAmount += depositedAmount * pool.get('oraclePrice');
      }
    });

    setUserTvl(userTvlAmount);
  }, [pools, tokens]);

  return { userTvl };
};

const isUniqueEarnContract = (pool, index, pools) => {
  const earnContractAddress = pool.get('earnContractAddress');
  return pools.findIndex(p => p.get('earnContractAddress') === earnContractAddress) === index;
};

export { usePoolsTvl, useUserTvl };
