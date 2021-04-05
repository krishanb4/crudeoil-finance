import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import MUIDataTable from "mui-datatables";


import CrudToolbar from "../../../components/Tables/CrudToolbar";

const styles = (theme) => ({
 
  table: {
    "& > div": {
      overflow: "auto",
    },
    "& table": {
      "& td": {
        wordBreak: "keep-all",
      },
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 60,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
  avatar: {
    marginRight: theme.spacing(1),
    "& svg": {
      fontSize: 24,
    },
    "&$sm": {
      width: 30,
      height: 30,
    },
    "&$mc": {
      width: 24,
      height: 24,
      top: 0,
      left: 8,
      marginRight: 0,
    },
  },
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class UserTable extends React.Component {
 
    state = {
      columns: [
        {
          name: "profilePhotoUrl",
          label: "User Profile",
          options: {
            customBodyRender: (value) => {
              return (
                <Avatar
                  alt={value}
                  src={`https://randomuser.me/api/portraits/women/90.jpg`}
                  className={this.props.classes.avatar}
                />
              );
            },
          },
        },
        {
          name: "userName",
          label: "User Name",
          options: {
            filter: true,
          },
        },
        {
          name: "emailAddress",
          label: "Email",
          options: {
            filter: true,
          },
        },
        {
          name: "roleName",
          label: "Role Name",
          options: {
            filter: true,
          },
        },
        {
          name: "isLocked",
          label: "Is Locked",
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 0) {
                return (
                  <RadioButtonCheckedRoundedIcon style={{ color: "#F74D57" }} />
                );
              }
              if (value === 1) {
                return (
                  <RadioButtonCheckedRoundedIcon style={{ color: "#32D95F" }} />
                );
              }
              return <RadioButtonCheckedRoundedIcon />;
            },
          },
        },
        {
          name: "isDisabled",
          label: "Is Disabled",
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 0) {
                return (
                  <RadioButtonCheckedRoundedIcon style={{ color: "#F74D57" }} />
                );
              }
              if (value === 1) {
                return (
                  <RadioButtonCheckedRoundedIcon style={{ color: "#32D95F" }} />
                );
              }
              return <RadioButtonCheckedRoundedIcon />;
            },
          },
        },
      ]
    }; 
   

  onRowsSelect = (currentRowsSelected, allRowsSelected) => {
    console.log();
  };

  onPageChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        //this.getUsers(tableState.page);
        break;
    }
  };
  render() {
    const { columns, } = this.state;
    const { classes , data, pageIndex, pageSize} = this.props;
    const options = {
      filterType: "multiselect",
      filter: false,
      serverSide: true,
      selectableRowsHeader: true,
      disableToolbarSelect: true,
      selectableRows: "multiple",
      count: pageSize,
      page: pageIndex,
      onTableChange: this.onPageChange,
      responsive: "stacked",
      onRowsDelete: this.onRowsSelect,
      print: false,
      download: false,
      rowsPerPage: 10,
      customToolbar: () => {
        return (
          <CrudToolbar
            onClickOnAdd={this.onRowsSelect}
            onClickOnUpdate={this.onRowsSelect}
            onClickOnDelete={this.onRowsSelect}
          />
        );
      },
      setTableProps: () => {
        return {
          padding: "default",
          size: "small",
        };
      },
    };
    return (
      <div className={classes.table}>
        
        <MUIDataTable
          title="Users in the System"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data : PropTypes.array.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default withStyles(styles)(UserTable);
