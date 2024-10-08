export const formatApy = apy => {
  if ( !apy || !apy.get('apy')) return `???`;
  
  let apyValue = apy.get('apy');

  apyValue *= 100;

  const units = ['', 'k', 'M', 'B', 'T', 'Q', 'Q', 'S', 'S'];
  const order = apyValue < 1 ? 0 : Math.floor(Math.log10(apyValue) / 3);
  if (order >= units.length - 1) return `🔥`;

  const num = apyValue / 1000 ** order;
  return `${num.toFixed(2)}${units[order]}%`;
};

export const formatTvl = (tvl, oraclePrice) => {
  // TODO: bignum?
  if (oraclePrice) {
    tvl *= oraclePrice;
  }

  const order = Math.floor(Math.log10(tvl) / 3);
  if (order < 0) {
    return '$0.00';
  }

  const units = ['', 'k', 'M', 'B', 'T'];
  const num = tvl / 1000 ** order;
  const prefix = '$';

  return prefix + num.toFixed(2) + units[order];
};

export const formatGlobalTvl = tvl => formatTvl(tvl, 1);

export const formatTotalApy = (apy, apy2) => {
  if ( (!apy || !apy.get('apy')) && (!apy2 || !apy2.get('apy')) ) return `???`;
  
  let apyValue = apy.get('apy') + apy2.get('apy');

  apyValue *= 100;

  const units = ['', 'k', 'M', 'B', 'T', 'Q', 'Q', 'S', 'S'];
  const order = apyValue < 1 ? 0 : Math.floor(Math.log10(apyValue) / 3);
  if (order >= units.length - 1) return `🔥`;

  const num = apyValue / 1000 ** order;
  return `${num.toFixed(2)}${units[order]}%`;
}

export const calcDaily = apy => {
  if ( !apy || !apy.get('apy')) return `???`;
  
  let apyValue = apy.get('apy');

  const g = Math.pow(10, Math.log10(apyValue + 1) / 365) - 1;
  if (isNaN(g)) {
    return '- %';
  }

  return `${(g * 100).toFixed(2)}%`;
};

export const formatCountdown = deadline => {
  const time = deadline - new Date().getTime();

  const day = Math.floor(time / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((time / (1000 * 60)) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, '0');

  return `${day}day ${hours}:${minutes}:${seconds}`;
};
