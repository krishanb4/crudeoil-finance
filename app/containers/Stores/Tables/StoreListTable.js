import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import MUIDataTable from "mui-datatables";
import Chip from "@material-ui/core/Chip";
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
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class StoreListTable extends React.Component {

    state = {
      columns: [
        {
          name: "storeName",
          label: "Store Name",
        },
        {
          name: "optometryOrganizationName",
          label: "Organization Name",
        },
        {
          name: "contactEmail",
          label: "Contact Email",
        },
        {
          name: "websiteURL",
          label: "Web site URL",
          options: {
            customBodyRender: (value) => {
              return <a href={value}>Link</a>;
            },
          },
        },
        {
          name: "contactNo",
          label: "Contact No",
        },
        {
          name: "address",
          label: "Address",
        },
        {
          name: "postalCode",
          label: "Postal Code",
          options: {
            viewColumns: true,
            display: "false",
          },
        },
        {
          name: "storeDisplayStatus",
          label: "Store Display Status",
          options: {
            customBodyRender: (value) => {
              if (value === false) {
                return (
                  <RadioButtonCheckedRoundedIcon style={{ color: "#F74D57" }} />
                );
              }
              if (value === true) {
                return (
                  <RadioButtonCheckedRoundedIcon style={{ color: "#32D95F" }} />
                );
              }
              return <RadioButtonCheckedRoundedIcon />;
            },
          },
        },
        {
          name: "status",
          label: "Status",
          options: {
            filter: true,
            viewColumns: true,
            display: "false",
            customBodyRender: (value) => {
              if (value === 999) {
                return (
                  <Chip
                    label="IN ACTIVE"
                    style={{ backgroundColor: "#E62189" }}
                    size="small"
                  />
                );
              }
              if (value === 0) {
                return (
                  <Chip
                    label="ACTIVE"
                    style={{ backgroundColor: "#32D95F" }}
                    size="small"
                  />
                );
              }
              return <Chip label="Unknown" size="small" />;
            },
          },
        },
      ]
    }

  onRowsSelect = (currentRowsSelected, allRowsSelected) => {
    console.log();
  };

  onPageChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        //this.getStores(tableState.page);
        break;
    }
  };

  render() {
    const { columns } = this.state;
    const { classes,data, pageIndex, pageSize, onAddClick, onEditClick,onRemoveClick,totalCount } = this.props;
    const options = {
      filterType: "multiselect",
      serverSide: true,
      selectableRowsHeader: false,
      disableToolbarSelect: true,
      selectableRows: "none",
      count: totalCount,
      page: pageIndex,
      onTableChange: this.onPageChange,
      responsive: "stacked",
      onRowsDelete: this.onRowsSelect,
      print: false,
      download: false,
      rowsPerPage: pageSize,
        customToolbar: () => {
          return (
            <CrudToolbar
              onClickOnAdd={onAddClick}
              onClickOnUpdate={onEditClick}
              onClickOnDelete={onRemoveClick}
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
          title="Optometric Stores"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}


StoreListTable.propTypes = {
  classes: PropTypes.object.isRequired,  
  data : PropTypes.array.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onAddClick : PropTypes.func,
  onEditClick : PropTypes.func,
  onSyncClick : PropTypes.func,
  onRemoveClick : PropTypes.func,
  onFilterChange : PropTypes.func,
  onPageChange : PropTypes.func
};

export default withStyles(styles)(StoreListTable);
