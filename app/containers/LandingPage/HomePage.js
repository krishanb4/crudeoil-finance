import React from "react";
import { withStyles } from '@material-ui/core/styles';
import styles from './home-jss';
import PropTypes from 'prop-types';

import {
  Banner,
  Feature,
  Showcase,
  Testimonials,
  Technology,
  Pricing,
  Contact,
} from "dan-components";
import { Link } from "react-router-dom";
import Ionicon from 'react-ionicons';
import IconButton from '@material-ui/core/IconButton';

class HomePage extends React.Component {
  render() {
    const {
      classes,
    } = this.props;

    return (

      <div className={classes.backgroundDiv}>
        <div className={classes.cloudDiv}>
          <img className={classes.cloudDivImg} src='/images/homepage/cloudz.gif' />
        </div>
        <div className={classes.headingDiv}>
          <img className={classes.headingImg} src='/images/homepage/header.png' />
          <span className={classes.headingText}>Next generation deflationary Farming and Yield Optimizer Platform built on Binance Smart Chain</span>
          <div className={classes.socialMediaRow}>
            <IconButton className={classes.socialMediaBtn} onClick={() => window.open('https://twitter.com/crudeoil_fi', "_blank")}>
              <Ionicon icon="logo-twitter" />
            </IconButton>
            <IconButton className={classes.socialMediaBtn} onClick={() => window.open('https://crudeoilfinance.medium.com/', "_blank")}>
              <img src="/images/logo/medium.png" width="24" />
            </IconButton>
            <IconButton className={classes.socialMediaBtn} onClick={() => window.open('https://t.me/crudeoilfinance_ANN', "_blank")}>
              <Ionicon icon="ios-send" />
            </IconButton>
            <IconButton className={classes.socialMediaBtn} onClick={() => window.open('https://github.com/CrudeoilFi', "_blank")}>
              <Ionicon icon="logo-github" />
            </IconButton>
            <IconButton className={classes.socialMediaBtn} onClick={() => window.open('https://docs.crudeoil.finance', "_blank")}>
              <img src="/images/logo/gitbook.png" width="24" />
            </IconButton>
          </div>
          <div className={classes.flexRow}>
            <Link className={classes.launchBtn} to="/app">Launch App</Link>
          </div>
        </div>
        <div className={classes.oilTankDiv}>
          <img className={classes.oilSmoke} src='/images/homepage/oil_smoke.gif' />
          <img src='/images/homepage/oil_tank.png' />
        </div>
        <div className={classes.oilRigDiv}>
          <img className={classes.oilRigGif} src='/images/homepage/oil_rig.gif' />
          <img className={classes.oilRig}  src='/images/homepage/oil_rig_2.png' />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
