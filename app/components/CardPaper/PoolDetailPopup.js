import React, { useState } from 'react';
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
import { fetchApproval, fetchDeposit,fetchVaultsData } from '../../actions/VaultAndPoolActions';
import { Toast } from 'dan-components';
import { closeToastAction } from 'dan-actions/ToastAction';
import { convertAmountFromRawNumber } from '../../helpers/bignumber';
import { ToastContainer } from 'react-toastify';
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
  depositAmount;
  const [depositSliderValue, setDepositSliderValue] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const { web3, address, toastMessage, toastHash, toastType } = useSelector(
    state => ({
      web3: state.getIn(['wallet', 'web3']),
      address: state.getIn(['wallet', 'address']),
      toastMessage : state.getIn(['toastMessage', 'toastMessage']),
      toastHash : state.getIn(['toastMessage', 'toastHash']),
      toastType : state.getIn(['toastMessage', 'type']),
    }),
    shallowEqual
  );

  const onClickApproval = () => {
    dispatch(
      fetchApproval({
        address,
        web3,
        tokenAddress: pool.get('tokenAddress'),
        contractAddress: pool.get('earnContractAddress'),
        index,
      }).then(()=>{
            dispatch(fetchVaultsData(address,web3,pool));
      }).catch((error)=> {
          console.log(error);
      })
    );
    // closeModal();
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const closeModal = async () => {
    await delay(10000);
    closeWithdrawModal();
  };

  const closeWithdrawModal = () => {
    onCloseModal();
  };

  const handleDepositSliderChangeRange = (e, newValue) => {
    let balance = token.get('tokenBalance');
    setDepositAmount((balance / 100) * newValue);
  };

  const handleWithdrawSliderChangeRange = (e, newValue) => {
    let balance = token.get('tokenBalance');
    setWithdrawAmount((balance / 100) * newValue);
  };

  const onDeposit = isAll => {
    let contractAddress = pool.get('earnContractAddress');
    if (isAll) {
      let amount = token.get('tokenBalance');
      dispatch(fetchDeposit({ address, web3, amount, contractAddress, index }));
    }else{
      dispatch(fetchDeposit({ address, web3, amount: depositAmount, contractAddress, index }));
    }
  };

  return (
    <Dialog
      fullScreen
      open={isOpenModal}
      onClose={closeWithdrawModal}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <div className={classes.dialogTitleRow}>
          <span>TVL : $0.00</span>
          <IconButton color="inherit" onClick={closeWithdrawModal} aria-label="Close">
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
              onChange ={(e)=>setDepositAmount(e.value)}
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
                    onClick={()=>onDeposit(false)}
                  >
                    <img className={classes.shopDetailsBtnImg} src="/images/deposit.svg" />
                    <span className={classes.shopDetailsBtnText}>Deposit</span>
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classNames(classes.shopDetailsBtnDeposit)}
                    onClick={() => onDeposit(true)}
                  >
                    <img className={classes.shopDetailsBtnImg} src="/images/deposit.svg" />
                    <span className={classes.shopDetailsBtnText}>Deposit All</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={classes.flexColumn}>
            <span className={classes.inputLabel}>Deposited : 0.00000000</span>
            <Input
              placeholder="0"
              value={withdrawAmount}
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
            />
            <div className={classes.flexRowCenter}>
              <Button
                color="secondary"
                variant="contained"
                className={classNames(classes.shopDetailsBtnWithdraw, classes.mr15)}
                onClick={closeWithdrawModal}
              >
                <img className={classes.shopDetailsBtnImg} src="/images/withdraw.svg" />
                <span className={classes.shopDetailsBtnText}>Withdraw</span>
              </Button>
              <Button
                color="secondary"
                variant="contained"
                className={classNames(classes.shopDetailsBtnWithdraw)}
                onClick={closeWithdrawModal}
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
            <Button color="secondary" variant="contained" className={classes.autoRewardsBtn}>
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
