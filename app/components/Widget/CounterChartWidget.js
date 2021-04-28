import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BarChart, Bar, AreaChart, Area, LineChart, Line } from 'recharts';
import { data1 } from 'dan-api/chart/chartMiniData';
import colorfull from 'dan-api/palette/colorfull';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import CounterWidget from '../Counter/CounterWidget';
import styles from './widget-jss';

class CounterChartWidget extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootCounter}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[2]}
              start={0}
              end={0}
              duration={3}
              title="Vaults TVL"
              unitBefore="$ "
              unitAfter="M"
            >
              <AreaChart width={100} height={60} data={data1}>
                <Area type="monotone" dataKey="uv" stroke="#FFFFFF" fill="rgba(255,255,255,.5)" />
              </AreaChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="Active Vaults"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="Daily Rewards (WBNB)"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="Total Rewards (WBNB)"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="% XYZ Staked"
              unitBefore="$ "
              unitAfter="%"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="XYZ Holders"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="Treasury (XYZ)"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="Treasury (WBNB)"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="XYZ Price"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
          <Grid item md={3} xs={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={0}
              duration={3}
              title="Market Cap"
            >
              <BarChart width={100} height={40} data={data1}>
                <Bar dataKey="uv" fill="#ffffff" />
              </BarChart>
            </CounterWidget>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CounterChartWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CounterChartWidget);
