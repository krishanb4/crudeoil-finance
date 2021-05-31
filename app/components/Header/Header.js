import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Ionicon from 'react-ionicons';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { disconnectWallet, connectWallet } from 'dan-actions/WalletActions';
import { fetchApys } from '../../actions/VaultAndPoolActions';
import { createWeb3Modal } from '../../web3';
import styles from './header-jss';
import { networkSetup } from '../../utils/networkSetup';
import * as types from '../../constants/actionConstants';

import useStyles from '../../hooks/useStyles';

const elem = document.documentElement;

const Header = ({ toggleDrawerOpen, margin, position, gradient, mode, title, changeMode }) => {
  const classes = useStyles(styles)();

  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [shortAddress, setShortAddress] = useState('');

  const dispatch = useDispatch();

  const { web3, address, networkId, connected, connectWalletPending, test } = useSelector(
    state => ({
      web3: state.getIn(['wallet', 'web3']),
      address: state.getIn(['wallet', 'address']),
      networkId: state.getIn(['wallet', 'networkId']),
      connected: state.getIn(['wallet', 'connected']),
      connectWalletPending: state.getIn(['wallet', 'connectWalletPending']),
      test: state.testreducer,
    }),
    shallowEqual
  );

  // Initial header style
  var flagDarker = false;
  var flagTitle = false;

  useEffect(() => {
    if (!connected) {
      return;
    }
    const asd = test;

    if (address.length < 11) {
      setShortAddress(address);
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [address, connected]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setWeb3Modal(createWeb3Modal());
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setWeb3Modal]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      dispatch(connectWallet(web3Modal));
      dispatch(fetchApys());
    }
  }, [web3Modal, connectWallet]);

  useEffect(() => {
    if (
      web3 &&
      address &&
      !connectWalletPending &&
      networkId &&
      Boolean(networkId !== Number(56))
    ) {
      networkSetup(process.env.REACT_APP_NETWORK_ID).catch(e => {
        dispatch({
          type: types.OPEN_TOAST,
          items: { type: 'error', hash: '', message: `${e}` },
        });
      });
    }
  }, [web3, address, networkId, connectWalletPending]);

  const connectToWallet = () => {
    dispatch(connectWallet(web3Modal));
  };

  const diConnectToWallet = () => {
    dispatch(disconnectWallet(web3, web3Modal));
  };

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    const newFlagTitle = scroll > 40;
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
    }
  };

  const openFullScreen = () => {
    setFullScreen(true);
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

  const closeFullScreen = () => {
    setFullScreen(false);
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

  const turnMode = mode => {
    if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('light');
    }
  };

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
        <div className={classes.headerProperties}>
          <div className={classNames(classes.headerAction, showTitle && classes.fadeOut)}>
            {fullScreen ? (
              <Tooltip title="Exit Full Screen" placement="bottom">
                <IconButton className={classes.button} onClick={closeFullScreen}>
                  <Ionicon icon="ios-qr-scanner" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Full Screen" placement="bottom">
                <IconButton className={classes.button} onClick={openFullScreen}>
                  <Ionicon icon="ios-qr-scanner" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Turn Dark/Light" placement="bottom">
              <IconButton className={classes.button} onClick={() => turnMode(mode)}>
                <Ionicon icon="ios-bulb-outline" />
              </IconButton>
            </Tooltip>
            <div className={classes.flexRowLeft}>
              <Tooltip title="Buy" placement="bottom">
                <Button className={classes.buyBtn} variant="contained" color="secondary">
                  <Ionicon icon="logo-usd" />
                  <span className={classes.walletBtnText}>Buy</span>
                </Button>
              </Tooltip>
              <Tooltip title="Connect To Wallet" placement="bottom">
                <Button
                  className={classes.walletBtn}
                  variant="contained"
                  color="secondary"
                  onClick={connected ? diConnectToWallet : connectToWallet}
                >
                  {connected ? (
                    <>
                      <Ionicon icon="ios-power" />
                      <span className={classes.walletBtnText}>{shortAddress}</span>
                    </>
                  ) : (
                    <>
                      <Ionicon icon="ios-card" />
                      <span className={classes.walletBtnText}>Wallet</span>
                    </>
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
          <Typography
            component="h2"
            className={classNames(classes.headerTitle, showTitle && classes.show)}
          >
            {title}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  gradient: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
};

export default Header;
