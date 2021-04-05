import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const defaultToolbarStyles = {
  iconButton: {},
};

class CrudToolbar extends React.Component {
  render() {
    const {
      onClickOnAdd,
      onClickOnUpdate,
      onClickOnDelete,
      onClickOnSync
    } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add New User"}>
          <IconButton onClick={onClickOnAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Update User"}>
          <IconButton onClick={onClickOnUpdate}>
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete User"}>
          <IconButton onClick={onClickOnDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Sync Data"}>
          <IconButton onClick={onClickOnSync}>
            <SyncRoundedIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}
CrudToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickOnAdd: PropTypes.func,
  onClickOnUpdate: PropTypes.func,
  onClickOnDelete: PropTypes.func,
  onClickOnSync: PropTypes.func
};

export default withStyles(defaultToolbarStyles, { name: "CrudToolbar" })(
  CrudToolbar
);
