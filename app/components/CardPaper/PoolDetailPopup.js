import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import Ionicon from 'react-ionicons';
import styles from './cardStyle-jss';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import * as types from '../../constants/actionConstants';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  fetchApproval,
  fetchBalances,
  fetchDeposit,
  fetchVaultsData,
  fetchWithdraw,
  fetchHarvest,
} from '../../actions/VaultAndPoolActions';
import { Toast } from 'dan-components';
import { closeToastAction } from 'dan-actions/ToastAction';
import { inputLimitPass, inputFinalVal, shouldHideFromHarvest } from '../../helpers/utils';
import BigNumber from 'bignumber.js';
import { byDecimals } from '../../helpers/bignumber';
import { formatTvl} from '../../helpers/format';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

function valuetext(value) {
  return `${value}%`;
}

const PoolDetailPopup = ({
  classes,
  pool,
  token,
  onCloseModal,
  isOpenModal,
  index,
  apy,
  apyDaily,
  RewardApy,
  RewardApyDaily
}) => {
  const dispatch = useDispatch();

  const [depositSliderValue, setDepositSliderValue] = useState(0);
  const [withdrawSliderValue, setWithdrawSliderValue] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  const { web3, address, toastMessage, toastHash, toastType, pools, tokens, isFetchBalancesPending, isFetchVaultsDataPending } = useSelector(
    state => ({
      web3: state.getIn(['wallet', 'web3']),
      pools: state.getIn(['vaults', 'pools']),
      tokens: state.getIn(['vaults', 'tokens']),
      address: state.getIn(['wallet', 'address']),
      toastMessage: state.getIn(['toastMessage', 'toastMessage']),
      toastHash: state.getIn(['toastMessage', 'toastHash']),
      toastType: state.getIn(['toastMessage', 'type']),
      isFetchBalancesPending: state.getIn(['vaults', 'isFetchBalancesPending']),      
      isFetchVaultsDataPending : state.getIn(['vaults', 'isFetchVaultsDataPending']),
      isApysPending : state.getIn(['vaults', 'isApysPending']),
    }),
    shallowEqual
  );

  useEffect(() => {
    resetForm();
  },[isOpenModal]);

  const onClickApproval = () => {
    setShowLoader(true);
    dispatch(
      fetchApproval({
        address,
        web3,
        tokenAddress: pool.get('tokenAddress'),
        contractAddress: pool.get('earnContractAddress'),
        index,
      })
    )
      .then(e => {
        dispatch(fetchVaultsData({ address, web3, pools }));
        dispatch(fetchBalances({ address, web3, tokens }));
        resetForm();
        setShowLoader(false);
      })
      .catch(error => {
        dispatch({
          type: types.OPEN_TOAST,
          items: { type: 'error', message: error },
        });
        setShowLoader(false);
      });
  };

  const onClosePopUp = () => {
    onCloseModal();
  };

  const onChangeWithdrawAmount = event => {
    let value = event.target.value;
    const total = new BigNumber(pool.get('deposited')).toNumber();

    if (!inputLimitPass(value, pool.get('tokenDecimals'))) {
      return;
    }

    let sliderNum = 0;
    let inputVal = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = byDecimals(inputVal / total, 0).toFormat(2) * 100;
    }

    setWithdrawAmount(inputFinalVal(value, total, pool.get('tokenDecimals')));
    setWithdrawSliderValue(sliderNum.toFixed(0));
  };

  const onChangeDepositAmount = event => {
    let value = event.target.value;
    const walletBalance = new BigNumber(token.get('tokenBalance')).toNumber();

    if (!inputLimitPass(value, token.get('tokenDecimals'))) {
      return;
    }

    let sliderNum = 0;
    let inputVal = 0;
    if (value) {
      inputVal = Number(value.replace(',', ''));
      sliderNum = byDecimals(inputVal / walletBalance, 0).toFormat(2) * 100;
    }

    setDepositAmount(inputFinalVal(value, walletBalance, token.get('tokenDecimals')));
    setDepositSliderValue(sliderNum.toFixed(0));
  };

  const handleDepositSliderChangeRange = (e, newValue) => {
    let balance = token.get('tokenBalance');
    setDepositAmount((balance / 100) * newValue);
    setDepositSliderValue(newValue);
  };

  const handleWithdrawSliderChangeRange = (e, newValue) => {
    let balance = pool.get('deposited');
    setWithdrawAmount((balance / 100) * newValue);
    setWithdrawSliderValue(newValue);
  };

  const onDeposit = isAll => {
    let contractAddress = pool.get('earnContractAddress');
    if (isAll) {
      let balance = token.get('tokenBalance');
      const pid = pool.get('pid');
      var amount = new BigNumber(balance)
        .multipliedBy(new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals')))
        .toString(10);

      setDepositAmount(balance);
      setDepositSliderValue(100);
      setShowLoader(true);
      dispatch(fetchDeposit({ address, web3, pid, amount, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
          setShowLoader(false);
        })
        .catch(error => {
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'error', message: error },
          });
          setShowLoader(false);
        });
    } else {
      let tDecimal = new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals'));
      const amount = new BigNumber(depositAmount).multipliedBy(tDecimal).toString(10);
      const pid = pool.get('pid');
      setShowLoader(true);
      dispatch(fetchDeposit({ address, web3, pid, amount, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
          setShowLoader(false);
        })
        .catch(error => {
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'error', message: error },
          });
          setShowLoader(false);
        });
    }
  };

  const onWithdraw = isAll => {
    let contractAddress = pool.get('earnContractAddress');
    if (isAll) {
      let balance = pool.get('deposited');
      let amount = new BigNumber(balance)
        .multipliedBy(new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals')))
        .toFixed(0);
      setWithdrawAmount(balance);
      setWithdrawSliderValue(100);
      const pid = pool.get('pid');
      setShowLoader(true);
      dispatch(fetchWithdraw({ address, web3, amount, pid, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
          setShowLoader(false);
        })
        .catch(error => {
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'error', message: error },
          });
          setShowLoader(false);
        });
    } else {
      let tDecimal = new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals'));
      const formatValue = withdrawAmount.toString().replace(',', '');
      let amount = new BigNumber(formatValue).multipliedBy(tDecimal).toString(10);
      const pid = pool.get('pid');
      setShowLoader(true);
      dispatch(fetchWithdraw({ address, web3, amount, pid, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
          setShowLoader(false);
        })
        .catch(error => {
          dispatch({
            type: types.OPEN_TOAST,
            items: { type: 'error', message: error },
          });
          setShowLoader(false);
        });
    }
  };

  const resetForm = () => {
    setWithdrawAmount(0);
    setWithdrawSliderValue(0);
    setDepositSliderValue(0);
    setDepositAmount(0);
  };

  const harvestReward = () => {
    const pid = pool.get('pid');
    let contractAddress = pool.get('earnContractAddress');
    setShowLoader(true);
    dispatch(fetchHarvest({ web3, address, pid, contractAddress, index }))
      .then(e => {
        dispatch(fetchVaultsData({ address, web3, pools }));
        dispatch(fetchBalances({ address, web3, tokens }));        
        setShowLoader(false);
      })
      .catch(error => {
        dispatch({
          type: types.OPEN_TOAST,
          items: { type: 'error', message: error },
        });
        setShowLoader(false);
      });
  };

  return (
    <Dialog
      fullScreen
      open={isOpenModal}
      onClose={onClosePopUp}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <div className={classes.dialogTitleRow}>
          <span>TVL : {formatTvl(pool.get('tvl'), pool.get('oraclePrice'))} </span>
          <IconButton color="inherit" onClick={onClosePopUp} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      {showLoader && <LinearProgress  className={classes.loaderBar}/>}
      <DialogContent>
        <Toast
          message={toastMessage}
          hash={toastHash}
          type={toastType}
          onClose={() => dispatch(closeToastAction())}
        />
        {showLoader && <div className={classes.loaderDiv}></div>}
        <div className={classes.dialogSliderGrid}>
          <div className={classes.flexColumn}>
            <span className={classes.inputLabel}>
              Balance : {isFetchBalancesPending ? <LinearProgress className={classes.depositedLoadingBar} /> : token.get('tokenBalance')}              
              </span>
            <Input
              placeholder="0"
              value={depositAmount}
              onChange={e => onChangeDepositAmount(e)}
              className={classes.inputBox}
              inputProps={{
                'aria-label': 'Balance',
              }}
            />
            <Slider
              defaultValue={0}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}              
              onChange={handleDepositSliderChangeRange}
              value={depositSliderValue}
            />
            <div className={classes.flexRowCenter}>
              {pool.get('allowance') === 0 ? (
                <Button
                  color="secondary"
                  variant="contained"
                  className={classNames(classes.shopDetailsBtnDeposit, classes.mr15)}
                  onClick={onClickApproval}
                >
                  <img className={classes.shopDetailsBtnImg} src="/images/deposit.svg" />
                  <span className={classes.shopDetailsBtnText}>Approve</span>
                </Button>
              ) : (
                <div>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classNames(classes.shopDetailsBtnDeposit, classes.mr15)}
                    onClick={() => onDeposit(false)}
                    disabled={token.get('tokenBalance') <= 0 || depositAmount <= 0}
                  >
                    <img className={classes.shopDetailsBtnImg} src="/images/deposit.svg" />
                    <span className={classes.shopDetailsBtnText}>Deposit</span>
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classNames(classes.shopDetailsBtnDeposit)}
                    onClick={() => onDeposit(true)}
                    disabled={token.get('tokenBalance') <= 0}
                  >
                    <img className={classes.shopDetailsBtnImg} src="/images/deposit.svg" />
                    <span className={classes.shopDetailsBtnText}>Deposit All</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={classes.flexColumn}>
            <span className={classes.inputLabel}>
               Deposited : {isFetchVaultsDataPending ? <LinearProgress className={classes.depositedLoadingBar} /> : pool.get('deposited')}           
              </span>
            <Input
              placeholder="0"
              value={withdrawAmount}
              onChange={e => onChangeWithdrawAmount(e)}
              className={classes.inputBox}
              inputProps={{
                'aria-label': 'Balance',
              }}
            />
            <Slider
              defaultValue={0}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}              
              onChange={handleWithdrawSliderChangeRange}
              value={withdrawSliderValue}
            />
            <div className={classes.flexRowCenter}>
              <Button
                color="secondary"
                variant="contained"
                className={classNames(classes.shopDetailsBtnWithdraw, classes.mr15)}
                disabled={pool.get('deposited') <= 0 || withdrawAmount <= 0}
                onClick={() => onWithdraw(false)}
              >
                <img className={classes.shopDetailsBtnImg} src="/images/withdraw.svg" />
                <span className={classes.shopDetailsBtnText}>Withdraw</span>
              </Button>
              <Button
                color="secondary"
                variant="contained"
                className={classNames(classes.shopDetailsBtnWithdraw)}
                disabled={pool.get('deposited') <= 0}
                onClick={() => onWithdraw(true)}
              >
                <img className={classes.shopDetailsBtnImg} src="/images/withdraw.svg" />
                <span className={classes.shopDetailsBtnText}>Withdraw All</span>
              </Button>
            </div>
          </div>
        </div>

        <div className={classes.autoRewardsRow}>
          <div className={classes.autoRewardsSection}>
            <span className={classes.autoRewardsHeading}>XYZ Rewards</span>
            <span className={classes.autoRewardsValue}>
            {isFetchVaultsDataPending ? <LinearProgress /> : pool.get('reward')}
              </span>
            <Button
              color="secondary"
              variant="contained"
              className={classes.autoRewardsBtn}
              onClick={harvestReward}
              disabled={pool.get('reward') <= 0}
            >
              <img src="/images/shovel.svg" width="20" height="20" />
              <span className={classes.detailsBtnText}>Harvest</span>
            </Button>
          </div>
        </div>

        <DialogContentText>
          <div className={classes.dialogGrid}>
            <div className={classes.flexColumn}>
              <span className={classes.detailsHeader}>Vault Details</span>
              <span>
                Asset: <b> {pool.get('name')}</b>
              </span>              
              <span>
                Type: <b>auto-compounding</b>
              </span>
              <span>
                Farm Name: <b>{pool.get('platform')}</b>
              </span>
            </div>
            <div className={classes.flexColumn}>
              <span className={classes.detailsHeader}>APY Calculations</span>
              <span>
                Farm APY:{' '}
                <b>
                  {apy}( {apyDaily} Daily)
                </b>
              </span>
              <span>
                Optimal Compounds per Year: <b>0</b>
              </span>
              <span>
                XYZ APY: <b>{RewardApy}( {RewardApyDaily} Daily)</b>
              </span>
            </div>
            <div className={classes.flexColumn}>
              <span className={classes.detailsHeader}>Fees</span>
              <span>
                Platform Fee: <b>0.1% - 0.05% withdraw or deposit fee</b>
              </span>
              <span>
                XYZ Buyback Rate: <b>None</b>
              </span>
              <span>
                Max Entrance Fee: <b>None</b>
              </span>
            </div>
          </div>
          <div className={classes.detailsBtnRow}>
            <Button
              target="_blank"
              color="secondary"
              variant="contained"
              className={classNames(classes.detailsBtn, classes.mr15)}
              href={pool.get('farmContract')}
            >
              <Ionicon icon="ios-open" />
              <span className={classes.detailsBtnText}>Farm Contract</span>
            </Button>
            <Button
              color="secondary"
              variant="contained"
              className={classNames(classes.detailsBtn, classes.mr15)}
              href={pool.get('vaultContract')}
              target="_blank"
            >
              <Ionicon icon="ios-open" />
              <span className={classes.detailsBtnText}>Vault Contract</span>
            </Button>
            <Button
              color="secondary"
              variant="contained"
              href={pool.get('addLiquidityUrl')}
              target="_blank"
              className={classNames(classes.detailsBtn, classes.mr15)}
            >
              <Ionicon icon="md-create" />
              <span className={classes.detailsBtnText}>{pool.get('oracle') == 'tokens'  ? 'BUY TOKEN' : 'Create LP'}</span>
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

PoolDetailPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  pool: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func,
  isOpenModal: PropTypes.bool,
};

export default withStyles(styles)(PoolDetailPopup);
