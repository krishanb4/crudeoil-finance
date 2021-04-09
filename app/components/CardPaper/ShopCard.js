import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import EditBtn from "@material-ui/icons/Edit";
import ReorderRoundedIcon from '@material-ui/icons/ReorderRounded';
import SettingsPhoneRoundedIcon from '@material-ui/icons/SettingsPhoneRounded';
import PinDropRoundedIcon from '@material-ui/icons/PinDropRounded';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import styles from "./cardStyle-jss";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

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
  }
];

function valuetext(value) {
  return `${value}%`;
}



class ShopCard extends React.Component {

  state = {
    depositModalopen: false,
    withdrawModalopen: false,
  };

  openDepositModal = () => {
    this.setState({ depositModalopen: true });
  };

  closeDepositModal = () => {
    this.setState({ depositModalopen: false });
  };

  openWithdrawModal = () => {
    this.setState({ withdrawModalopen: true });
  };

  closeWithdrawModal = () => {
    this.setState({ withdrawModalopen: false });
  };

  handleChange = (event, newValue) => {
    setValue(newValue);
  };

  render() {
    const { depositModalopen } = this.state;
    const { withdrawModalopen } = this.state;
    const today = new Date();
    const {
      classes,
      data,
      list,
      detailOpen,
      addOrUpdateOpen,
      width,
      deleteOpen
    } = this.props;
    return (
      <Card
        className={classNames(
          classes.cardProduct,
          isWidthUp("sm", width) && list ? classes.cardList : "",
          data.get('boosted') ? classes.boostedCard : '',
          data.get('paused') ? classes.pausedCard : ''
        )}
      >
        {/* <div className={classes.status}>
          {new Date(data.get("closedFrom")) < today && new Date(data.get("closedTo")) >= today && (
            <Chip
              label={`Closed until : ${data.get('closedTo')} `}
              className={classes.chipDiscount}
            />
          )}
        </div> */}
        {/* <CardMedia
          className={classes.mediaProduct}
          image={data.get('image')}
          title={data.get('name')}
        /> */}

        <CardContent className={classes.floatingButtonWrap}>
          <div className={classes.shopImg}>
            <img src={data.get('image')} width="35" />
          </div>
          <section className={classes.boostedTagDiv}>
            {data.get('boosted') && <div className={classes.boostedTag}>
              <img className={classes.boostBtnImg} src='/images/boost.svg' />
            Boosted
            </div>}
          </section>
          <section className={classes.boostedTagDiv}>
            {data.get('paused') && <div className={classes.pausedTag}>
              Deposits Paused
            </div>}
          </section>
          <Typography
            noWrap
            gutterBottom
            variant="h8"
            className={classes.title}
            component="h5"
          >
            {data.get('name')}
          </Typography>
          <div className={classes.shopDetailsDescGrid}>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('balance')}</span>
              <span className={classes.shopDetailsLabel}>Balance</span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('deposited')}</span>
              <span className={classes.shopDetailsLabel}>Deposited</span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('apy')}</span>
              <span className={classes.shopDetailsLabel}>APY </span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('daily')}</span>
              <span className={classes.shopDetailsLabel}>Daily </span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('tvl')}</span>
              <span className={classes.shopDetailsLabel}>TVL</span>
            </Typography>
          </div>


        </CardContent>
        <CardActions className={classes.actionRow}>
          <div className={classes.shopDetailsBtnRow}>
            <Button color="secondary" variant="contained"
              className={classNames(
                classes.shopDetailsBtnDeposit,
                data.get('paused') ? classes.disabledBtn : ''
              )} disabled={data.get('paused')} onClick={this.openDepositModal}>
              <img className={classes.shopDetailsBtnImg} src='/images/deposit.svg' />
              <span className={classes.shopDetailsBtnText}>Deposit</span>
            </Button>
            <Button color="primary" variant="contained"
              className={classes.shopDetailsBtnWithdraw} onClick={this.openWithdrawModal}>
              <img className={classes.shopDetailsBtnImg} src='/images/withdraw.svg' />
              <span className={classes.shopDetailsBtnText}>Withdraw</span>
            </Button>
          </div>
        </CardActions>
        <Modal
          aria-labelledby="Deposit Modal"
          aria-describedby="simple-modal-description"
          open={depositModalopen}
          onClose={this.closeDepositModal}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={classes.mb40} variant="h6" id="modal-title">
              Deposit
            </Typography>
            <Slider
              defaultValue={10}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              step={1}
              marks={marks}
              valueLabelDisplay="on"
            />
            <div className={classes.flexRow}>
              <div>
                <span>Balance : </span>
                <span>0.00</span>
              </div>
              <div className={classes.mlAuto}>
                <Button color="secondary" variant="contained"
                  className={classNames(
                    classes.shopDetailsBtnDeposit, classes.mr15
                  )} onClick={this.closeWithdrawModal}>
                  <img className={classes.shopDetailsBtnImg} src='/images/deposit.svg' />
                  <span className={classes.shopDetailsBtnText}>Deposit</span>
                </Button>
                <Button color="secondary" variant="contained"
                  className={classNames(
                    classes.shopDetailsBtnDeposit
                  )} onClick={this.closeWithdrawModal}>
                  <img className={classes.shopDetailsBtnImg} src='/images/deposit.svg' />
                  <span className={classes.shopDetailsBtnText}>Deposit All</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          aria-labelledby="Withdraw Modal"
          aria-describedby="simple-modal-description"
          open={withdrawModalopen}
          onClose={this.closeWithdrawModal}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={classes.mb40} variant="h6" id="modal-title">
              Withdraw
            </Typography>
            <Slider
              defaultValue={10}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-always"
              step={1}
              marks={marks}
              valueLabelDisplay="on"
            />
            <div className={classes.flexRow}>
              <div>
                <span>Balance : </span>
                <span>0.00</span>
              </div>
              <div className={classes.mlAuto}>
                <Button color="secondary" variant="contained"
                  className={classNames(
                    classes.shopDetailsBtnWithdraw, classes.mr15
                  )} onClick={this.closeWithdrawModal}>
                  <img className={classes.shopDetailsBtnImg} src='/images/withdraw.svg' />
                  <span className={classes.shopDetailsBtnText}>Withdraw</span>
                </Button>
                <Button color="secondary" variant="contained"
                  className={classNames(
                    classes.shopDetailsBtnWithdraw
                  )} onClick={this.closeWithdrawModal}>
                  <img className={classes.shopDetailsBtnImg} src='/images/withdraw.svg' />
                  <span className={classes.shopDetailsBtnText}>Withdraw All</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </Card>

    );
  }
}

ShopCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  detailOpen: PropTypes.func.isRequired,
  addOrUpdateOpen: PropTypes.func.isRequired,
  deleteOpen: PropTypes.func.isRequired
};

ShopCard.defaultProps = {
  list: false,
  detailOpen: () => false,
};

const ShopCardResponsive = withWidth()(ShopCard);
export default withStyles(styles)(ShopCardResponsive);
