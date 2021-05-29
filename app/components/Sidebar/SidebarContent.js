import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import brand from 'dan-api/dummy/brand';
import dummy from 'dan-api/dummy/dummyContents';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';
import Ionicon from 'react-ionicons';
import IconButton from '@material-ui/core/IconButton';

import { fetchPrice } from '../../web3';

const mainContent = document.getElementById('sidebar');

const SidebarContent = ({
  classes,
  turnDarker,
  drawerPaper,
  toggleDrawerOpen,
  loadTransition,
  leftSidebar,
  dataMenu,
  status,
  anchorEl,
  openMenuStatus,
  closeMenuStatus,
  changeStatus,
  isLogin,
}) => {
  const [transform, setTransform] = useState(0);
  const [oilPrice, setOilPrice] = useState(0);
  const [dieselPrice, setDieselPrice] = useState(0);

  useEffect(() => {
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', handleScroll);

    return () => {
      mainContent.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
   setOilPrice(fetchPrice({id: 'OIL'}));
   setDieselPrice(fetchPrice({id: 'DIESEL'}));
  },[]);

  const handleScroll = event => {
    const scroll = event.target.scrollTop;
    this.setState({
      transform: scroll,
    });
  };

  return (
    <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
      <div className={classes.drawerHeader}>
        <NavLink
          to="/app"
          className={classNames(classes.brand, classes.brandBar, turnDarker && classes.darker)}
        >
          <img src={brand.logo} alt={brand.name} />
          {brand.name}
        </NavLink>
        {isLogin && (
          <div
            className={classNames(classes.profile, classes.user)}
            style={{
              opacity: 1 - transform / 100,
              marginTop: transform * -0.3,
            }}
          >
            <div
              className={classNames(!drawerPaper ? classes.circleWrapperSm : classes.circleWrapper)}
            >
              <div className={classes.circle} />
              <Avatar
                alt={dummy.network.title}
                src={dummy.network.bscLogo}
                className={classNames(
                  classes.avatar,
                  classes.bigAvatar,
                  !drawerPaper ? classes.avatarPosSm : classes.avatarPos
                )}
              />
            </div>
            <style>{`
                 @keyframes spin { 
                  100% { 
                    transform: rotateZ(360deg);
                  }
                }`}</style>

            <div>
              <Button size="small" onClick={openMenuStatus}>
                <h4>{dummy.network.title}</h4>
              </Button>

              {/* <Button size="small" onClick={openMenuStatus}>
                  <i className={classNames(classes.dotStatus, setStatus(status))} />
                  {status}
                </Button> */}
              <Menu
                id="status-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenuStatus}
                className={classes.statusMenu}
              >
                <MenuItem onClick={() => changeStatus('bsc')}>
                  <img src={dummy.network.bscLogo} width="10" height="10" />
                  BSC
                </MenuItem>
                <MenuItem onClick={() => changeStatus('heco')}>
                  <img src={dummy.network.hecoLogo} width="10" height="10" />
                  HECO
                </MenuItem>
                <MenuItem onClick={() => changeStatus('avalanche')}>
                  <img src={dummy.network.avalancheLogo} width="10" height="10" />
                  AVALANCHE
                </MenuItem>
              </Menu>
            </div>
          </div>
        )}
      </div>
      <div className={classNames(!drawerPaper ? classes.hidePriceFooter : classes.priceFooter)}>
        <div className={classes.priceMenuDivider} />
        <div className={classes.mb8}>
          <span>
            OIL Price: <b>$ {oilPrice.toFixed(4)}</b>
          </span>
        </div>
        <div>
          <span>
            DIESEL Price: <b>${dieselPrice.toFixed(4)}</b>
          </span>
        </div>
      </div>
      <div className={classes.menuFooter}>
        <div
          className={classNames(!drawerPaper ? classes.menuDividerSmall : classes.menuDivider)}
        />
        <div className={classes.flexWrap}>
          <IconButton onClick={() => window.open('https://twitter.com/crudeoil_fi', '_blank')}>
            <Ionicon icon="logo-twitter" />
          </IconButton>
          <IconButton onClick={() => window.open('https://t.me/crudeoilfinance_ANN', '_blank')}>
            <Ionicon icon="ios-send" />
          </IconButton>
          <IconButton onClick={() => window.open('https://farm.crudeoil.finance/', '_blank')}>
            <Ionicon icon="md-globe" />
          </IconButton>
          <IconButton onClick={() => window.open('https://crudeoilfinance.medium.com/', '_blank')}>
            <img src="/images/logo/medium.png" width="24" />
          </IconButton>
          <IconButton>
            <span className={classes.languageBtn}>EN</span>
          </IconButton>
        </div>
      </div>
      <div
        id="sidebar"
        className={classNames(
          classes.menuContainer,
          leftSidebar && classes.rounded,
          isLogin && classes.withProfile
        )}
      >
        <MainMenu
          loadTransition={loadTransition}
          dataMenu={dataMenu}
          toggleDrawerOpen={toggleDrawerOpen}
        />
      </div>
    </div>
  );
};

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  turnDarker: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  openMenuStatus: PropTypes.func.isRequired,
  closeMenuStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
};

SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
  anchorEl: null,
  isLogin: true,
};

export default withStyles(styles)(SidebarContent);
