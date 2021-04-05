import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

export default class ConfirmationModal extends React.Component {
  render() {
    const { isOpen,  onAgree, onDisagree ,body, title } = this.props;
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={onDisagree}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
           <HelpOutlineRoundedIcon/> {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={onAgree} color="primary" autoFocus>
              Yes
            </Button>
            <Button onClick={onDisagree} color="primary">
              No
            </Button>            
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onAgree: PropTypes.func.isRequired,
  onDisagree: PropTypes.func.isRequired,
};
ConfirmationModal.defaultProps = {
    isOpen : false,
    title : "Confirm",
    body : 'Are You sure to proceed the operation ?'
}
