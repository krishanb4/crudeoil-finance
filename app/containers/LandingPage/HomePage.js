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
          <img src='/images/homepage/header.png' />
        </div>
        <div className={classes.flexRow}>
          <Link className={classes.launchBtn} to="/app">Launch App</Link>
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
