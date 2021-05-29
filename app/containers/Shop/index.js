import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Toast } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import SearchShop from './Operations/SearchShop';
import ShopGallery from './Operations/ShopGallery';
import { closeToastAction } from 'dan-actions/ToastAction';
import { Pagination } from '../../components';
import Ionicon from 'react-ionicons';
import useStyles from '../../hooks/useStyles';
import {
  fetchVaultsData,
  fetchBalances,
  fetchApys,
  fetchApproval,
} from '../../actions/VaultAndPoolActions';
import { usePoolsTvl, useUserTvl } from '../../hooks/usePoolsTvl';
import { initializePriceCache } from '../../web3/fetchPrice';
import { formatGlobalTvl } from '../../helpers/format';
import LinearProgress from '@material-ui/core/LinearProgress';
import Web3 from 'web3';

const Shop = ({ checkout, search }) => {
  const classes = useStyles(styles)();
  const stateData = useSelector(state => state);
  const dispatch = useDispatch();

  const keyword = stateData.getIn(['shop', 'keywordValue']);
  const shopData = stateData.getIn(['shop', 'list']);
  const shopIndex = stateData.getIn(['shop', 'shopIndex']);
  const totalItems = stateData.getIn(['shop', 'totalItems']);

  const isLoading = stateData.getIn(['common', 'isLoading']);

  const [listView, setListView] = useState('grid');

  const [page, setPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(1);

  const {
    web3,
    address,
    pools,
    tokens,
    toastMessage,
    toastHash,
    toastType,
    apys,
    isFetchBalancesPending,
  } = useSelector(
    state => ({
      web3: state.getIn(['wallet', 'web3']),
      address: state.getIn(['wallet', 'address']),
      pools: state.getIn(['vaults', 'pools']),
      tokens: state.getIn(['vaults', 'tokens']),
      apys: state.getIn(['vaults', 'apys']),
      toastMessage: state.getIn(['toastMessage', 'toastMessage']),
      toastHash: state.getIn(['toastMessage', 'toastHash']),
      toastType: state.getIn(['toastMessage', 'type']),
      isFetchBalancesPending: state.getIn(['vaults', 'isFetchBalancesPending']),
      isFetchVaultsDataPending: state.getIn(['vaults', 'isFetchVaultsDataPending']),
    }),
    shallowEqual
  );

  const { poolsTvl } = usePoolsTvl(pools);
  const { userTvl } = useUserTvl(pools, tokens);

  const FETCH_INTERVAL_MS = 240000;

  useEffect(() => {
    initializePriceCache();
  }, []);

  useEffect(() => {
    const fetch = () => {
      dispatch(fetchApys());
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetch]);

  useEffect(() => {
    const fetch = () => {
      refreshVaults();
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [address, web3, fetchVaultsData, fetchApproval]);

  const handleSwitchView = (event, value) => {
    setListView(value);
  };

  const onPageChange = page => {
    setPage(page);
  };

  const onPrev = () => {
    if (page > 1) {
      setPage(page => (page -= 1));
    } else {
      setPage(1);
    }
  };

  const onNext = totalPages => {
    if (page < totalPages) {
      setPage(page => (page += 1));
    } else {
      setPage(totalPages);
    }
  };

  const onGoFirst = () => {
    setPage(1);
  };

  const onGoLast = totalPages => {
    setPage(totalPages);
  };

  const refreshVaults = () => {
    if (address && web3) {
      dispatch(fetchBalances({ address, web3, tokens }));
    }
    dispatch(fetchVaultsData({ address, web3, pools }));
    dispatch(fetchApys());
  };

  const title = brand.name + ' - Optimizer';
  const description = brand.desc;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Toast
        message={toastMessage}
        hash={toastHash}
        type={toastType}
        onClose={() => dispatch(closeToastAction())}
      />
      <div className={classes.headDetails}>
        <span className={classes.tvlText}>TVL : {formatGlobalTvl(poolsTvl)}</span>
        {/* <span className={classes.depositedText}>Deposited :{isFetchBalancesPending ? <LinearProgress className={classes.depositLoadBar} /> : formatGlobalTvl(userTvl)} </span> */}
        <span className={classes.depositedText}>Deposited : {formatGlobalTvl(userTvl)} </span>
        <span className={classes.detailsText}>
          There is a 0.05%-0.1% withdrawal or deposit fee on all vaults
        </span>
      </div>

      <div className={classes.disclaimer}>
        <Ionicon icon="ios-alert" />
        <span className={classes.disclaimertext}>
          Using Smart Contracts, Tokens, and Crypto is always a risk. DYOR before investing.
        </span>
      </div>

      <SearchShop
        shopData={shopData}
        checkout={checkout}
        totalItems={totalItems}
        search={search}
        keyword={keyword}
        listView={listView}
        onRefreshVaults={refreshVaults}
        handleSwitchView={handleSwitchView}
      />
      <ShopGallery
        listView={listView}
        pools={pools}
        tokens={tokens}
        apys={apys}
        keyword={keyword}
      />
      <Pagination
        curpage={page}
        totpages={1}
        boundaryPagesRange={1}
        onChange={onPageChange}
        siblingPagesRange={1}
        hideEllipsis={false}
        onPrev={onPrev}
        onNext={() => onNext(pageNumbers.length)}
        onGoFirst={onGoFirst}
        onGoLast={() => onGoLast(pageNumbers.length)}
      />
      {isLoading && (
        <img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />
      )}
    </div>
  );
};

Shop.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Shop;

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },

  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  disclaimer: {
    backgroundColor: '#FEEFB3',
    fontSize: '14px',
    padding: '5px 15px',
    fontWeight: '600',
    color: '#9F6000',
    borderRadius: '7px',
  },
  disclaimertext: {
    marginLeft: '5px',
  },
  headDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 10,
    marginTop: '-20px',
  },
  tvlText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 600,
  },
  depositedText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 400,
  },
  detailsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 400,
  },
  depositLoadBar: {
    top: -8,
    width: '84%',
    left: 90,
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
  },
});
