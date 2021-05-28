import React from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Ionicon from 'react-ionicons';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import styles from './coming-soon-jss';

class ComingSoon extends React.Component {
  state = {
    email: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const title = brand.name + ' - Coming Soon';
    const description = brand.desc;
    const { classes, deco } = this.props;
    const { email } = this.state;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.fullFormWrap}>
            <Paper
              className={
                classNames(
                  classes.fullWrap,
                  deco && classes.petal,
                  classes.centerV
                )
              }
            >
           
              <Typography variant="h4" className={classes.titleGradient} gutterBottom>
                Our development team is working on this. It will be available soon...
              </Typography>
              <div>
                <img className={classes.comingSoonImg} src='/images/screen/comin_soon.gif' />
              </div>

            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

ComingSoon.propTypes = {
  classes: PropTypes.object.isRequired,
  deco: PropTypes.bool.isRequired,
};

const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(ComingSoon);

export default withStyles(styles)(FormInit);
