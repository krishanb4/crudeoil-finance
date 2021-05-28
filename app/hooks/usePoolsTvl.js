import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';
import { byDecimals } from '../helpers/bignumber';

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
    let userTvl = 0;

    pools.filter(isUniqueEarnContract).forEach(pool => {
      const token = tokens.find(c => c.get('token') == pool.get('earnedToken'));
      const sharesBalance = new BigNumber(token.get('tokenBalance'));
      if (sharesBalance > 0) {
        const deposited = byDecimals(
          sharesBalance.multipliedBy(new BigNumber(pool.get('pricePerFullShare'))),
          pool.get('tokenDecimals')
        );
        userTvl += deposited * pool.get('oraclePrice');
      }
    });

    setUserTvl(userTvl);
  }, [pools, tokens]);

  return { userTvl };
};

const isUniqueEarnContract = (pool, index, pools) => {
  const earnContractAddress = pool.get('earnContractAddress');
  return pools.findIndex(p => p.get('earnContractAddress') === earnContractAddress) === index;
};

export { usePoolsTvl, useUserTvl };
