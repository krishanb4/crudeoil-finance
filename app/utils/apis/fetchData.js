import axios from 'axios';
import { apiCacheTime } from '../apiCacheTime';

const API_BASE_URL = 'http://localhost:3200';

const endpoints = {
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
  tokens: `${API_BASE_URL}/prices`,
  lps: `${API_BASE_URL}/lps`,
};

const CACHE_TIMEOUT = 5 * 60 * 1000;
const cache = {};

function isCached({ oracle, id }) {
  if (`${oracle}-${id}` in cache) {
    return cache[`${oracle}-${id}`].t + CACHE_TIMEOUT > Date.now();
  }
  return false;
}

function getCachedPrice({ oracle, id }) {
  return cache[`${oracle}-${id}`].price;
}

function addToCache({ oracle, id, price }) {
  cache[`${oracle}-${id}`] = { price: price, t: Date.now() };
}

const fetchCoingecko = async id => {
  try {
    const response = await axios.get(endpoints.coingecko, {
      params: { ids: id, vs_currencies: 'usd' },
    });
    return response.data[id].usd;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchTokens = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prices?_=${apiCacheTime()}`);
    return response.data[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchLP = async id => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lps?_=${apiCacheTime()}`);
    return response.data[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const fetchPrice = async ({ oracle, id }) => {
  try {
    if (oracle === undefined) {
      console.error('Undefined oracle');
      return 0;
    }
    if (id === undefined) {
      console.error('Undefined pair');
      return 0;
    }

    if (isCached({ oracle, id })) {
      return getCachedPrice({ oracle, id });
    }

    let price = 0;
    switch (oracle) {
      case 'coingecko':
        price = await fetchCoingecko(id);
        break;

      case 'tokens':
        price = await fetchTokens(id);
        break;

      case 'lps':
        price = await fetchLP(id);
        break;

      default:
        price = 0;
    }

    addToCache({ oracle, id, price });
    return price;
  } catch (error) {
    console.log('error====>', error);
  }
};

export const getEarnings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/earnings?_=${apiCacheTime()}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getHolders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/holders?_=${apiCacheTime()}`);
    return response.data['holderCount'];
  } catch (err) {
    console.error(err);
    return 0;
  }
};
