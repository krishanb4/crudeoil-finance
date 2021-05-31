import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';
import Check from '@material-ui/icons/CheckCircle';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Ionicon from 'react-ionicons';
import dummy from 'dan-api/dummy/dummyContents';
import messageStyles from 'dan-styles/Messages.scss';
import styles from './header-jss';
import Error from '@material-ui/icons/RemoveCircle'

class HeaderNotification extends React.Component {
  state = {
    anchorEl: null,
    openMenu: null
  };

  handleMenu = menu => (event) => {
    const { openMenu } = this.state;
    this.setState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, openMenu: null });
  };

  render() {
    const { classes, dark } = this.props;
    const { anchorEl, openMenu } = this.state;
    return (
      <div>        
        <IconButton
          aria-haspopup="true"
          onClick={this.handleMenu('notification')}
          color="inherit"
          className={classNames(classes.notifIcon, dark ? classes.dark : classes.light)}
        >
          <Badge className={classes.badge} badgeContent={4} color="secondary">
            <Ionicon icon="ios-notifications-outline" />
          </Badge>
        </IconButton>
        <Menu
          id="menu-notification"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          className={classes.notifMenu}
          PaperProps={{
            style: {
              width: 375,
              height: 'auto',
              maxHeight: 300,
              overflowY: 'auto'
            },
          }}
          open={openMenu === 'notification'}
          onClose={this.handleClose}
        >
          <MenuItem className={classes.notifItem} onClick={this.handleClose}>
            <div className={messageStyles.messageSuccess}>
              <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                  <Check />
                </Avatar>
              </ListItemAvatar>
              <div className={classes.textNotifDiv}>
              <span className={classes.textNotif}>TXN :<span className={classes.textNotifLink} 
              onClick={() => window.open(`https://bscscan.com/tx/920192012019202002020`, '_blank')}>920192012019202002020</span>was successfull</span>
              <span className={classes.textNotifSecodary}>10 mins ago</span>
              </div>
            </div>
          </MenuItem>
          <Divider className={classes.notifDivider} variant="inset" />
          <MenuItem className={classes.notifItem} onClick={this.handleClose}>
            <div className={messageStyles.messageError}>
              <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                <Error />
                </Avatar>
              </ListItemAvatar>
              <div className={classes.textNotifDiv}>
              <span className={classes.textNotif}>TXN : <span className={classes.textNotifLink} 
              onClick={() => window.open(`https://bscscan.com/tx/920192012019202002020`, '_blank')}>920192012019202002020</span> failed</span>
              <span className={classes.textNotifSecodary}>12 mins ago</span>
              </div>
            </div>
          </MenuItem>
          <Divider className={classes.notifDivider} variant="inset" />
        </Menu>
      </div>
    );
  }
}

HeaderNotification.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};

HeaderNotification.defaultProps = {
  dark: false
};

export default withStyles(styles)(HeaderNotification);
