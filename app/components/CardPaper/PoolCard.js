import React, {useState} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { isWidthUp } from "@material-ui/core/withWidth";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./cardStyle-jss";
import Button from '@material-ui/core/Button';
import PoolDetailPopup from './PoolDetailPopup';
import { useDispatch } from 'react-redux';
import * as types from '../../constants/actionConstants';
import { formatApy, formatTvl, calcDaily } from '../../helpers/format';

const PoolCard =({classes, width, tokens, pool, apys, isListView, index }) => {

  const dispatch = useDispatch();

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

 const openDetailModal = () => {    
   setIsOpenDetailModal(true);

  };

  var token = tokens.find(t => 
      t.get('token') == pool.get('token')
  );

  var poolApy = apys.find(t => 
    t.get('token') == pool.get('id')
);

const calAPY =()=> {
 return formatApy(poolApy || 0);
}


const calAPYDaily =()=> {
  return calcDaily(poolApy || 0);
 }

  const onCloseDetailModal = () => {
    setIsOpenDetailModal(false);    
  };

  
    return (
      <Card
        className={classNames(
          classes.cardProduct,
          isWidthUp("sm", width) && isListView ? classes.cardList : "",
          pool.get('boosted') ? classes.boostedCard : '',
          pool.get('paused') ? classes.pausedCard : '',
          isListView ? classes.cardFlex : ""
        )}
      >
        <CardContent className={classNames(
            classes.floatingButtonWrap,
            isListView ? classes.cardFlexGrow : ''
          )}>
          <div className={classNames(
            classes.shopBgImgContainer,
            isListView ? classes.shopBgImgContainerFull : ''
          )}>
            <img className={classes.shopBgImg} src={pool.get('platformImage')} />
          </div>
          <div className={classes.shopImg}>
            <img src={pool.get('logo')} width="35" />
          </div>          
          <section className={classes.boostedTagDiv}>
            {pool.get('depositsPaused') && <div className={classNames(
              classes.pausedTag,
              isListView ? classes.listPausedTag : ''
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
            {pool.get('name')}
          </Typography>
          <div className={classNames(
            classes.shopDetailsDescGrid,
            isListView ? classes.shopDetailsDescGridLong : ''
          )}>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{pool.get('deposited')}</span>
              <span className={classes.shopDetailsLabel}>Deposited</span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{token.get('tokenBalance')}</span>
              <span className={classes.shopDetailsLabel}>Available</span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{formatApy(poolApy || 0)}</span>
              <span className={classes.shopDetailsLabel}>APY </span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{calcDaily(poolApy || 0)}</span>
              <span className={classes.shopDetailsLabel}>Daily </span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{ formatTvl (pool.get('tvl'), pool.get('oraclePrice'))}</span>
              <span className={classes.shopDetailsLabel}>TVL</span>
            </Typography>
            <Typography component="p" className={classes.shopDetailsDesc}>
              <span className={classes.shopDetailsValue}>{pool.get('reward')}</span>
              <span className={classes.shopDetailsLabel}>Reward</span>
            </Typography>
          </div>
          {isListView && <div className={classes.rowAdditonalGrid}>
              <div className={classes.flexColumn}>
                <span className={classes.detailsHeader}>Vault Details</span>
                <span>Asset: <b>{pool.get('name')}</b></span>
                <span>XYZ Multiplyer: <b>2x</b></span>
                <span>Type: <b>auto-compounding</b></span>
                <span>Farm Name: <b>{pool.get('platform')}</b></span>
              </div>
              <div className={classes.flexColumn}>
                <span className={classes.detailsHeader}>APY Calculations</span>
                <span>Farm APR: <b>0.00% (0.00% Daily)</b></span>
                <span>Optimal Compounds per Year: <b>0</b></span>
                <span>Farm APY: <b>{formatApy(poolApy || 0)}</b></span>
                <span>XYZ APR: <b>201.20% (0.55% Daily)</b></span>
              </div>
              <div className={classes.flexColumn}>
                <span className={classes.detailsHeader}>Fees</span>                
                <span>Platform Fee: <b>0.1% - 0.05% withdraw or deposit fee</b></span>
                <span>XYZ Buyback Rate: <b>None</b></span>
                <span>Max Entrance Fee: <b>None</b></span>
              </div>
            </div>}


        </CardContent>
        <CardActions className={classes.actionRow}>
          <div className={classNames(
            isListView ? classes.shopDetailsBtnCol : classes.shopDetailsBtnRow
          )}>
            <Button color="secondary" variant="contained"
              className={classNames(
                classes.shopDetailsBtnDeposit,
                pool.get('paused') ? classes.disabledBtn : '',
                isListView ? classes.listBtn : ''
              )} disabled={pool.get('paused')} onClick={openDetailModal}>
              <img className={classes.shopDetailsBtnImg} src='/images/deposit.svg' />
              <span className={classes.shopDetailsBtnText}>Deposit</span>
            </Button>
            <Button color="primary" variant="contained"
              className={classes.shopDetailsBtnWithdraw} onClick={openDetailModal}>
              <img className={classes.shopDetailsBtnImg} src='/images/withdraw.svg' />
              <span className={classes.shopDetailsBtnText}>Withdraw</span>
            </Button>
          </div>
        </CardActions> 
        <PoolDetailPopup isOpenModal ={isOpenDetailModal} pool={pool} onCloseModal= {onCloseDetailModal} token ={token} index={index} apy ={calAPY()} apyDaily = {calAPYDaily()} ></PoolDetailPopup>       
      </Card>      

    );
}

PoolCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  pool: PropTypes.object.isRequired,
  apys:PropTypes.object.isRequired,
  isListView: PropTypes.bool
};

PoolCard.defaultProps = {
  isListView: false
};

export default withStyles(styles)(PoolCard);
