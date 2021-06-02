import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/CheckCircle';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Ionicon from 'react-ionicons';
import messageStyles from 'dan-styles/Messages.scss';
import styles from './header-jss';

import ErrorIcon from '@material-ui/icons/Error';

const HeaderNotification = ({ dark, data, classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenu = menu => event => {
    setOpenMenu(openMenu === menu ? null : menu);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        onClick={handleMenu('notification')}
        color="inherit"
        className={classNames(classes.notifIcon, dark ? classes.dark : classes.light)}
      >
        <Badge className={classes.badge} badgeContent={data.count()} color="secondary">
          <Ionicon icon="ios-notifications-outline" />
        </Badge>
      </IconButton>
      {data.count() > 0 ? (
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
              overflowY: 'auto',
            },
          }}
          open={openMenu === 'notification'}
          onClose={handleClose}
        >
          {data.map((mes, index) => (
            <div>
              <MenuItem
                className={classNames(classes.notifItem, classes.successNotification)}
                onClick={handleClose}
                key={index.toString()}
              >
                <div
                  className={
                    mes.get('status') === 'failed'
                      ? messageStyles.messageError
                      : messageStyles.messageSuccess
                  }
                >
                  <ListItemAvatar>
                    <Avatar className={messageStyles.icon}>
                      {mes.get('status') == 'failed' ? <ErrorIcon /> : <Check />}
                    </Avatar>
                  </ListItemAvatar>
                  <div className={classes.textNotifDiv}>
                    <span className={classes.textNotif}>
                      TXN :
                      <span
                        className={classes.textNotifLink}
                        onClick={() =>
                          window.open(`https://bscscan.com/tx/${mes.get('txnId')}`, '_blank')
                        }
                      >
                        {mes.get('txnId').slice(0, 6)}...{mes.get('txnId').slice(-6)}
                      </span>
                    </span>
                    <span className={classes.textNotifSecodary}>
                      {Math.floor((new Date().getTime() - mes.get('time')) / 60000)} mins ago
                    </span>
                  </div>
                </div>
              </MenuItem>
              <div>
                {data.size - 1 !== index ? (
                  <Divider className={classes.notifDivider} variant="inset" />
                ) : (
                  ''
                )}
              </div>
            </div>
          ))}
        </Menu>
      ) : null}
    </div>
  );
};

HeaderNotification.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool,
  data: PropTypes.object,
};

HeaderNotification.defaultProps = {
  dark: false,
};

export default withStyles(styles)(HeaderNotification);
