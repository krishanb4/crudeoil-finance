import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { CounterChartWidget, TableWidget } from 'dan-components';
import styles from './dashboard-jss';

class CrmDahboard extends PureComponent {
  render() {
    const title = brand.name + ' - Overall Stats';
    const description = brand.desc;
    const { classes } = this.props;
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
        <Grid container className={classes.root}>
          <CounterChartWidget />
        </Grid>
        <Divider className={classes.divider} />
        <TableWidget />
        <Divider className={classes.divider} />
      </div>
    );
  }
}

CrmDahboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrmDahboard);
