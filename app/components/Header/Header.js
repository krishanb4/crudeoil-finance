import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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

import { connectWallet, disconnectWallet } from 'dan-actions/ShopsActions';
import { createWeb3Modal } from '../../web3';

import useStyles from '../../hooks/useStyles';

const elem = document.documentElement;

const Header = ({ toggleDrawerOpen, margin, position, gradient, mode, title, changeMode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [web3Model, setWeb3Modal] = useState(null);

  // Initial header style
  var flagDarker = false;
  var flagTitle = false;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setWeb3Modal(web3Model => createWeb3Modal());
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const connectToWallet = () => {
    dispatch(connectWallet(web3Model));
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
                  onClick={() => connectToWallet()}
                >
                  <Ionicon icon="ios-card" />
                  <span className={classes.walletBtnText}>Wallet</span>
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
