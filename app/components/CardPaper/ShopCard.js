import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./cardStyle-jss";
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input';
import Ionicon from 'react-ionicons';

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
    const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
      return <Slide direction="up" ref={ref} {...props} />;
    });
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
          <div className={classNames(
            classes.shopBgImgContainer,
            list ? classes.shopBgImgContainerFull : ''
          )}>
            <img className={classes.shopBgImg} src={data.get('platformImage')} />
          </div>
          <div className={classes.shopImg}>
            <img src={data.get('logo')} width="35" />
          </div>
          {/* <section className={classes.boostedTagDiv}>
            {data.get('boosted') && <div className={classNames(
              classes.boostedTag,
              list ? classes.listBoostedTag : ''
            )}>
              <img className={classes.boostBtnImg} src='/images/boost.svg' />
            Boosted
            </div>}
          </section> */}
          <section className={classes.boostedTagDiv}>
            {data.get('depositsPaused') && <div className={classNames(
              classes.pausedTag,
              list ? classes.listPausedTag : ''
            )}>
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
          <div className={classNames(
            classes.shopDetailsDescGrid,
            list ? classes.shopDetailsDescGridLong : ''
          )}>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('balance')}</span>
              <span className={classes.shopDetailsLabel}>Deposited</span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('deposited')}</span>
              <span className={classes.shopDetailsLabel}>Available</span>
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
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{data.get('reward')}</span>
              <span className={classes.shopDetailsLabel}>Reward</span>
            </Typography>
          </div>
          {list && <div className={classes.rowAdditonalGrid}>
              <div className={classes.flexColumn}>
                <span className={classes.detailsHeader}>Vault Details</span>
                <span>Asset: <b>OIL-BNB LP</b></span>
                <span>XYZ Multiplyer: <b>11.50x</b></span>
                <span>Type: <b>Stalking</b></span>
                <span>Farm Name: <b>XYZ</b></span>
              </div>
              <div className={classes.flexColumn}>
                <span className={classes.detailsHeader}>APY Calculations</span>
                <span>Farm APR: <b>0.00% (0.00% Daily)</b></span>
                <span>Optimal Compunds per Year: <b>0</b></span>
                <span>Farm APY: <b>0.00%</b></span>
                <span>XYZ APR: <b>201.20% (0.55% Daily)</b></span>
              </div>
              <div className={classes.flexColumn}>
                <span className={classes.detailsHeader}>Fees</span>
                <span>Controller Fee: <b>None</b></span>
                <span>Platform Fee: <b>None</b></span>
                <span>XYZ Buyback Rate: <b>None</b></span>
                <span>Max Entrance Fee: <b>None</b></span>
              </div>
            </div>}


        </CardContent>
        <CardActions className={classes.actionRow}>
          <div className={classNames(
            list ? classes.shopDetailsBtnCol : classes.shopDetailsBtnRow
          )}>
            <Button color="secondary" variant="contained"
              className={classNames(
                classes.shopDetailsBtnDeposit,
                data.get('paused') ? classes.disabledBtn : '',
                list ? classes.listBtn : ''
              )} disabled={data.get('paused')} onClick={this.openWithdrawModal}>
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

        <Dialog
          fullScreen
          open={withdrawModalopen}
          onClose={this.closeWithdrawModal}
          aria-labelledby="responsive-dialog-title"
        >

          <DialogTitle id="responsive-dialog-title">
            <div className={classes.dialogTitleRow}>
              <span>TVL : $0.00</span>
              <IconButton color="inherit" onClick={this.closeWithdrawModal} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.dialogSliderGrid}>
              <div className={classes.flexColumn}>
                <span className={classes.inputLabel}>Balance : 0.00000000</span>
                <Input
                  placeholder="0"
                  className={classes.inputBox}
                  inputProps={{
                    'aria-label': 'Balance',
                  }}
                />
                <Slider
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  marks={marks}
                  valueLabelDisplay="on"
                />
                <div className={classes.flexRowCenter}>
                  <Button color="secondary" variant="contained"
                    className={classNames(
                      classes.shopDetailsBtnDeposit, classes.mr15
                    )} onClick={this.closeWithdrawModal}>
                    <img className={classes.shopDetailsBtnImg} src='/images/deposit.svg' />
                    <span className={classes.shopDetailsBtnText}>Approve</span>
                  </Button>
                </div>
              </div>
              <div className={classes.flexColumn}>
                <span className={classes.inputLabel}>Deposited : 0.00000000</span>
                <Input
                  placeholder="0"
                  className={classes.inputBox}
                  inputProps={{
                    'aria-label': 'Balance',
                  }}
                />
                <Slider
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  marks={marks}
                  valueLabelDisplay="on"
                />
                <div className={classes.flexRowCenter}>
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

            <div className={classes.autoRewardsRow}>
              <div className={classes.autoRewardsSection}>
                <span className={classes.autoRewardsHeading}>XYZ Rewards</span>
                <span className={classes.autoRewardsValue}>$0.00</span>
                <Button color="secondary" variant="contained"
                  className={classes.autoRewardsBtn}>
                  <span className={classes.detailsBtnText}>Harvest</span>
                  <Ionicon icon="ios-open" />
                </Button>
              </div>
            </div>

            <DialogContentText>

              <div className={classes.dialogGrid}>
                <div className={classes.flexColumn}>
                  <span className={classes.detailsHeader}>Vault Details</span>
                  <span>Asset: <b>OIL-BNB LP</b></span>
                  <span>XYZ Multiplyer: <b>11.50x</b></span>
                  <span>Type: <b>Stalking</b></span>
                  <span>Farm Name: <b>XYZ</b></span>
                </div>
                <div className={classes.flexColumn}>
                  <span className={classes.detailsHeader}>APY Calculations</span>
                  <span>Farm APR: <b>0.00% (0.00% Daily)</b></span>
                  <span>Optimal Compunds per Year: <b>0</b></span>
                  <span>Farm APY: <b>0.00%</b></span>
                  <span>XYZ APR: <b>201.20% (0.55% Daily)</b></span>
                </div>
                <div className={classes.flexColumn}>
                  <span className={classes.detailsHeader}>Fees</span>
                  <span>Controller Fee: <b>None</b></span>
                  <span>Platform Fee: <b>None</b></span>
                  <span>XYZ Buyback Rate: <b>None</b></span>
                  <span>Max Entrance Fee: <b>None</b></span>
                </div>
              </div>
              <div className={classes.detailsBtnRow}>
                <Button color="secondary" variant="contained"
                  className={classNames(
                    classes.detailsBtn, classes.mr15
                  )}>
                  <span className={classes.detailsBtnText}>Farm Contract</span>
                  <Ionicon icon="ios-open" />
                </Button>
                <Button color="secondary" variant="contained"
                  className={classes.detailsBtn}>
                  <span className={classes.detailsBtnText}>Vault Contract</span>
                  <Ionicon icon="ios-open" />
                </Button>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
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
