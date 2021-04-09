import React from 'react';
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
// import logo from 'dan-images/logo_01.png';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';
import Ionicon from 'react-ionicons';
import IconButton from '@material-ui/core/IconButton';

class SidebarContent extends React.Component {
  state = {
    transform: 0,
  };

  componentDidMount = () => {
    // Scroll content to top
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    const mainContent = document.getElementById('sidebar');
    mainContent.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    const scroll = event.target.scrollTop;
    this.setState({
      transform: scroll,
    });
  };

  render() {
    const {
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
    } = this.props;
    const { transform } = this.state;

    const setStatus = st => {
      switch (st) {
        case 'bsc':
          dummy.network.title = 'BSC';
          return dummy.network.title;
        case 'heco':
          dummy.network.title = 'HECO';
          return dummy.network.title;
        case 'avalanche':
          dummy.network.title = 'AVALANCHE';
          return dummy.network.title;
        default:
          return dummy.network.title;
      }
    };
    return (
      <div
        className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}
      >
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
              <Avatar
                alt={dummy.network.title}
                src={dummy.network.bscLogo}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />

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
                {/* <Menu
                  id="status-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={closeMenuStatus}
                  className={classes.statusMenu}
                >
                  <MenuItem onClick={() => changeStatus('online')}>
                    <i className={classNames(classes.dotStatus, classes.online)} />
                    Online
                  </MenuItem>
                  <MenuItem onClick={() => changeStatus('idle')}>
                    <i className={classNames(classes.dotStatus, classes.idle)} />
                    Idle
                  </MenuItem>
                  <MenuItem onClick={() => changeStatus('bussy')}>
                    <i className={classNames(classes.dotStatus, classes.bussy)} />
                    Bussy
                  </MenuItem>
                  <MenuItem onClick={() => changeStatus('offline')}>
                    <i className={classNames(classes.dotStatus, classes.offline)} />
                    Offline
                  </MenuItem>
                </Menu> */}
              </div>
            </div>
          )}
        </div>
        <div className={classes.menuFooter}>
          <IconButton>
            <Ionicon icon="logo-twitter" />
          </IconButton>
          <IconButton>
            <Ionicon icon="ios-send" />
          </IconButton>
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
  }
}

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
  toggleDrawerOpen: () => { },
  loadTransition: () => { },
  anchorEl: null,
  isLogin: true,
};

export default withStyles(styles)(SidebarContent);
