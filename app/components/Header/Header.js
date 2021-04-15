import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Ionicon from 'react-ionicons';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './header-jss';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { closeToastAction, openToastAction } from "dan-actions/ToastAction";
import {
  connectWallet,
  disconnectWallet
} from "dan-actions/ShopsActions";
const elem = document.documentElement;

import { createWeb3Modal } from '../../web3';

class Header extends React.Component {
  state = {
    open: false,
    fullScreen: false,
    turnDarker: false,
    showTitle: false,
    web3Modal : null
  };

  // Initial header style
  flagDarker = false;

  flagTitle = false;

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
     this.setState({'web3Model' : createWeb3Modal()})
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    const newFlagTitle = scroll > 40;
    if (this.flagDarker !== newFlagDarker) {
      this.setState({ turnDarker: newFlagDarker });
      this.flagDarker = newFlagDarker;
    }
    if (this.flagTitle !== newFlagTitle) {
      this.setState({ showTitle: newFlagTitle });
      this.flagTitle = newFlagTitle;
    }
  };

  connectToWallet = ()=> {
    this.props.connectWallet();
  };

  openFullScreen = () => {
    this.setState({ fullScreen: true });
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  closeFullScreen = () => {
    this.setState({ fullScreen: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  turnMode = mode => {
    const { changeMode } = this.props;
    if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('light');
    }
  };

  render() {
    const {
      classes,
      toggleDrawerOpen,
      margin,
      position,
      gradient,
      mode,
      title,
      openGuide,
      history,
    } = this.props;
    const { fullScreen, open, turnDarker, showTitle } = this.state;

    const setMargin = sidebarPosition => {
      if (sidebarPosition === 'right-sidebar') {
        return classes.right;
      }
      if (sidebarPosition === 'left-sidebar-big') {
        return classes.leftBig;
      }
      return classes.left;
    };

    return (
      <AppBar
        className={classNames(
          classes.appBar,
          classes.floatingBar,
          margin && classes.appBarShift,
          setMargin(position),
          turnDarker && classes.darker,
          gradient ? classes.gradientBg : classes.solidBg
        )}
      >
        <Toolbar disableGutters={!open}>
          <Fab
            size="small"
            className={classes.menuButton}
            aria-label="Menu"
            onClick={toggleDrawerOpen}
          >
            <MenuIcon />
          </Fab>
          {/* <Hidden smDown> */}
            <div className={classes.headerProperties}>
              <div className={classNames(classes.headerAction, showTitle && classes.fadeOut)}>
                {fullScreen ? (
                  <Tooltip title="Exit Full Screen" placement="bottom">
                    <IconButton className={classes.button} onClick={this.closeFullScreen}>
                      <Ionicon icon="ios-qr-scanner" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Full Screen" placement="bottom">
                    <IconButton className={classes.button} onClick={this.openFullScreen}>
                      <Ionicon icon="ios-qr-scanner" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Turn Dark/Light" placement="bottom">
                  <IconButton className={classes.button} onClick={() => this.turnMode(mode)}>
                    <Ionicon icon="ios-bulb-outline" />
                  </IconButton>
                </Tooltip>
                <div className={classes.flexRowLeft}>
                  <Tooltip title="Turn Dark/Light" placement="bottom">
                    <span>EN</span>
                  </Tooltip>
                  <Tooltip title="Turn Dark/Light" placement="bottom">
                    <Button className={classes.walletBtn} variant="contained" color="secondary" onClick = {()=> this.connectToWallet()}>
                    <Ionicon icon="ios-card" />
                    <span className={classes.walletBtnText}>Wallet</span>
                  </Button>
                  </Tooltip>

                </div>
                {/* <Tooltip title="Show Guide" placement="bottom">
                  <IconButton className={classes.button} onClick={openGuide}>
                    <Ionicon icon="ios-help-circle-outline" />
                  </IconButton>
                </Tooltip> */}
              </div>
              <Typography
                component="h2"
                className={classNames(classes.headerTitle, showTitle && classes.show)}
              >
                {title}
              </Typography>
            </div>
          {/* </Hidden> */}
          {/* <div className={classes.searchWrapper}>
            <div className={classNames(classes.wrapper, classes.light)}>
              <div className={classes.search}>
                <SearchIcon />
              </div>
              <SearchUi history={history} />
            </div>
          </div> */}
          {/* <Hidden xsDown>
            <span className={classes.separatorV} />
          </Hidden>
          <UserMenu /> */}
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  gradient: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
const reducer = "wallet";
const mapStateToProps = (state) => ({
  force: state, // force state from reducer
  keyword: state.getIn([reducer, "keywordValue"]),
  shopData: state.getIn([reducer, "list"]),
  shopIndex: state.getIn([reducer, "shopIndex"]),
  totalItems: state.getIn([reducer, "totalItems"]),
  toastMessage: state.getIn(["toastMessage", "toastMessage"]),
  toastType: state.getIn(["toastMessage", "type"]),
  isLoading: state.getIn(["common", "isLoading"]),
});

const mapDispatchToProps = (dispatch) => ({
  connectWallet: bindActionCreators(connectWallet, dispatch),
  disconnectWallet: bindActionCreators(disconnectWallet, dispatch),
  closeToast: bindActionCreators(closeToastAction, dispatch),
  openToast: bindActionCreators(openToastAction, dispatch)
  
});

const HeaderMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default withStyles(styles)(HeaderMapped);
