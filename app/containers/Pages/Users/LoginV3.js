import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { LoginFormV3, Toast } from "dan-components";
import styles from "dan-components/Forms/user-jss";
import { login } from "../../../redux/services/authService";
import {closeToastAction,openToastAction } from 'dan-actions/ToastAction';
import {LOGGED_USER} from '../../../constants/localStorageKeyConstants';
import history  from '../../../utils/history';

class LoginV3 extends React.Component {
  state = {
    valueForm: []
  };

  async submitForm(values) {   
    try {
      const formValue = {};
      values.map((val, i) => {
        formValue[i] = val;
      });
       const loggedUser = await login(formValue);
       localStorage.setItem(LOGGED_USER , loggedUser);
       history.push('/app');
    } catch (error) {
      this.props.openToast({message :error.message, type : 'error'});
      history.push('/app');
    }
  }

  render() {
    const title = brand.name + " - Login Version 3";
    const description = brand.desc;
    const { classes,closeToast,toastMessage,toastType } = this.props;
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
            <LoginFormV3 onSubmit={(values) => this.submitForm(values)} />
            <Toast message = {toastMessage} type ={toastType} onClose={()=>closeToast()}
            ></Toast>
          </div>
        </div>
      </div>
    );
  }
}



LoginV3.propTypes = {
  classes: PropTypes.object.isRequired,
  toastMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  toastMessage: state.getIn(['toastMessage','toastMessage']),
  toastType: state.getIn(['toastMessage','type']),
});

const mapDispatchToProps = dispatch => ({
  closeToast: bindActionCreators(closeToastAction, dispatch),
  openToast : bindActionCreators(openToastAction,dispatch)
});

const LoginV3Mapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginV3);

export default withStyles(styles)(LoginV3Mapped);

