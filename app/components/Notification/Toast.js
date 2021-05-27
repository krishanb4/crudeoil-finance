import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  messagetxt: {
    marginRight: 10
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, hash, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <div>
          <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <span className={classes.messagetxt}>{message}</span>
          <span>
         { hash ? <Button onClick={() => window.open(`https://bscscan.com/tx/${hash}`, '_blank')}>View</Button> : null }
        </span>
        </span>
     
        </div>        
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  message: PropTypes.node,
  hash: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]),
};

MySnackbarContent.defaultProps = {
  onClose: () => {},
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles = (theme) => ({
  snackbar: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  margin: {
    margin: theme.spacing(1),
  },
});

const action = (
  <Button color="secondary" size="small">
    Action
  </Button>
);

class Toast extends React.Component {

  
  handleCloseStyle = (event, reason) => {
    if (reason === "clickaway") {
      //this.props.onClose();
    }
    this.setState({ isClose: false });
    this.props.onClose();
  };

  render() {
    const { message, type, hash } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={message !== ""}
        autoHideDuration={4000}
        onClose={this.handleCloseStyle}
      >
        <MySnackbarContentWrapper
          onClose={this.handleCloseStyle}
          variant= {type}
          message= {message}
          hash= {hash}
        />
      </Snackbar>
    );
  }
}

Toast.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  hash: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  type: "success",
  message: "",
  hash: "",
};

export default withStyles(styles)(Toast);
