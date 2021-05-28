import React, { useState, useCallback } from 'react';
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
import {
  fetchApproval,
  fetchBalances,
  fetchDeposit,
  fetchVaultsData,
  fetchWithdraw,
} from '../../actions/VaultAndPoolActions';
import { Toast } from 'dan-components';
import { closeToastAction } from 'dan-actions/ToastAction';
import { convertAmountFromRawNumber } from '../../helpers/bignumber';
import { inputLimitPass, inputFinalVal, shouldHideFromHarvest } from '../../helpers/utils';
import BigNumber from 'bignumber.js';
import { byDecimals } from '../../helpers/bignumber';
import { formatApy, formatTvl, calcDaily } from '../../helpers/format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const PoolDetailPopup = ({ classes, pool, token, onCloseModal, isOpenModal, index }) => {
  const dispatch = useDispatch();

  const [depositSliderValue, setDepositSliderValue] = useState(0);
  const [withdrawSliderValue, setWithdrawSliderValue] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const { web3, address, toastMessage, toastHash, toastType, pools, tokens } = useSelector(
    state => ({
      web3: state.getIn(['wallet', 'web3']),
      pools: state.getIn(['vaults', 'pools']),
      tokens : state.getIn(['vaults', 'tokens']),
      address: state.getIn(['wallet', 'address']),
      toastMessage: state.getIn(['toastMessage', 'toastMessage']),
      toastHash: state.getIn(['toastMessage', 'toastHash']),
      toastType: state.getIn(['toastMessage', 'type']),
    }),
    shallowEqual
  );

  const SuccessMsg = () => (
    <div style={{ display: 'flex', alignItems: 'center'}}>
        <Ionicon icon="ios-checkmark-circle" />
        <span style={{ marginLeft: 5}}>Transaction Successfull</span>
    </div>
  )

  const onClickApproval = () => {
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
      })
      .catch(() => {

      });
  };


  const onClosePopUp = () => {
    onCloseModal();
  };

  const onChangeWithdrawAmount = event => {
    let value = event.target.value;
    const total = new BigNumber(pool.get('pricePerFullShare')).toNumber();

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
    setWithdrawSliderValue(sliderNum);
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
    setDepositSliderValue(sliderNum);
  };

  const handleDepositSliderChangeRange = (e, newValue) => {
    let balance = token.get('tokenBalance');
    setDepositAmount((balance / 100) * newValue);
    setDepositSliderValue(newValue);
  };

  const handleWithdrawSliderChangeRange = (e, newValue) => {
    let balance = pool.get('pricePerFullShare');
    setWithdrawAmount((balance / 100) * newValue);
    setWithdrawSliderValue(newValue);
  };

  const onDeposit = isAll => {
    let contractAddress = pool.get('earnContractAddress');
    if (isAll) {
      let balance = token.get('tokenBalance');
      var amount = new BigNumber(balance).multipliedBy(new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals')))
        .toString(10);

      setDepositAmount(balance);
      setDepositSliderValue(100);
      dispatch(fetchDeposit({ address, web3, amount, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
        })
        .catch(() => {});
    } else {
      let tDecimal = new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals'));
      let amount = new BigNumber(depositAmount).multipliedBy(tDecimal).toString(10);

      dispatch(fetchDeposit({ address, web3, amount, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
        })
        .catch(() => {});
    }
  };

  const onWithdraw = isAll => {
    let contractAddress = pool.get('earnContractAddress');
    if (isAll) {
      let balance = pool.get('pricePerFullShare');
      let amount = new BigNumber(balance)
        .multipliedBy(new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals')))
        .toString(10);
      setWithdrawAmount(balance);
      setWithdrawSliderValue(100);

      dispatch(fetchWithdraw({ address, web3, amount, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
        })
        .catch(() => {});
    } else {
      let tDecimal = new BigNumber(10).exponentiatedBy(pool.get('tokenDecimals'));
      const formatValue = withdrawAmount.replace(',','');
      let amount = new BigNumber(formatValue).multipliedBy(tDecimal).toString(10);

      dispatch(fetchWithdraw({ address, web3, amount, contractAddress, index }))
        .then(e => {
          dispatch(fetchVaultsData({ address, web3, pools }));
          dispatch(fetchBalances({ address, web3, tokens }));
          resetForm();
        })
        .catch(() => {});
    }
  };

  const resetForm = () => {
    setWithdrawAmount(0);
    setWithdrawSliderValue(0);
    setDepositSliderValue(0);
    setDepositAmount(0);
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const showSuccessMsgTest = async () => {
    await delay(5000);
    toast.success(SuccessMsg); 
  };

  const harvestReward =()=> {
    // dispatch({
    //   type: types.OPEN_TOAST,
    //   items: { type: 'success', hash: '210210291909012919029012', message: 'Transaction Pending' }
    // });
    const hash = '210210291909012919029012';
    const PendingMsg = () => (
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <Ionicon icon="ios-alert-outline" /> 
          <span style={{ marginLeft: 5}}>Transaction Pending</span>
        </div>
        <div style={{ marginLeft: 28}}> Confirmation is in progress. Check your transction on 
          <span style={{ cursor: 'pointer', color: '#2b2d80', fontWeight: 600, marginLeft: 5}} onClick={() => window.open(`https://bscscan.com/tx/${hash}`, '_blank')}>here</span>
        </div>
      </div>
    )
    toast.warn(PendingMsg); 
    showSuccessMsgTest(); 
  }

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
      <DialogContent>
      <ToastContainer position="top-right"
        autoClose={20000}
        closeOnClick={false}
        newestOnTop
        pauseOnHover/>
      <Toast message={toastMessage} hash={toastHash} type={toastType} onClose={() => dispatch(closeToastAction())} />
        <div className={classes.dialogSliderGrid}>
          <div className={classes.flexColumn}>
            <span className={classes.inputLabel}>Balance : {token.get('tokenBalance')}</span>
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
              step={1}
              marks={marks}
              valueLabelDisplay="on"
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
                    disabled = {token.get('tokenBalance') <=0}
                  >
                    <img className={classes.shopDetailsBtnImg} src="/images/deposit.svg" />
                    <span className={classes.shopDetailsBtnText}>Deposit</span>
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classNames(classes.shopDetailsBtnDeposit)}
                    onClick={() => onDeposit(true)}
                    disabled = {token.get('tokenBalance') <=0}
                  >
                    <img className={classes.shopDetailsBtnImg} src="/images/deposit.svg" />
                    <span className={classes.shopDetailsBtnText}>Deposit All</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={classes.flexColumn}>
            <span className={classes.inputLabel}>Deposited : {pool.get('pricePerFullShare')}</span>
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
              step={1}
              marks={marks}
              valueLabelDisplay="on"
              onChange={handleWithdrawSliderChangeRange}
              value={withdrawSliderValue}
            />
            <div className={classes.flexRowCenter}>
              <Button
                color="secondary"
                variant="contained"
                className={classNames(classes.shopDetailsBtnWithdraw, classes.mr15)}
                disabled = {pool.get('pricePerFullShare') <=0}
                onClick={() => onWithdraw(false)}
              >
                <img className={classes.shopDetailsBtnImg} src="/images/withdraw.svg" />
                <span className={classes.shopDetailsBtnText}>Withdraw</span>
              </Button>
              <Button
                color="secondary"
                variant="contained"
                className={classNames(classes.shopDetailsBtnWithdraw)}
                disabled = {pool.get('pricePerFullShare') <=0}
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
            <span className={classes.autoRewardsValue}>$0.00</span>
            <Button color="secondary" variant="contained" className={classes.autoRewardsBtn} onClick ={harvestReward}>
              <span className={classes.detailsBtnText}>Harvest</span>
              <Ionicon icon="ios-open" />
            </Button>
          </div>
        </div>

        <DialogContentText>
          <div className={classes.dialogGrid}>
            <div className={classes.flexColumn}>
              <span className={classes.detailsHeader}>Vault Details</span>
              <span>
                Asset: <b>OIL-BNB LP</b>
              </span>
              <span>
                XYZ Multiplyer: <b>11.50x</b>
              </span>
              <span>
                Type: <b>Stalking</b>
              </span>
              <span>
                Farm Name: <b>XYZ</b>
              </span>
            </div>
            <div className={classes.flexColumn}>
              <span className={classes.detailsHeader}>APY Calculations</span>
              <span>
                Farm APR: <b>0.00% (0.00% Daily)</b>
              </span>
              <span>
                Optimal Compunds per Year: <b>0</b>
              </span>
              <span>
                Farm APY: <b>0.00%</b>
              </span>
              <span>
                XYZ APR: <b>201.20% (0.55% Daily)</b>
              </span>
            </div>
            <div className={classes.flexColumn}>
              <span className={classes.detailsHeader}>Fees</span>
              <span>
                Controller Fee: <b>None</b>
              </span>
              <span>
                Platform Fee: <b>None</b>
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
              color="secondary"
              variant="contained"
              className={classNames(classes.detailsBtn, classes.mr15)}
            >
              <span className={classes.detailsBtnText}>Farm Contract</span>
              <Ionicon icon="ios-open" />
            </Button>
            <Button color="secondary" variant="contained" className={classes.detailsBtn}>
              <span className={classes.detailsBtnText}>Vault Contract</span>
              <Ionicon icon="ios-open" />
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
