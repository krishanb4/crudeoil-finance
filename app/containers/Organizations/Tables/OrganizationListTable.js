import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import { getOrganizationsWithFilters } from "../../../redux/services/OrganizationService";
import CrudToolbar from "../../../components/Tables/CrudToolbar";

const styles = (theme) => ({
  circularProgress: {
    position: "fixed",
    top: "calc(50% - -5px)",
    left: "calc(50% - 45px)",
    zIndex: 10,
    opacity: 0.5,
  },
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
class OrganizationListTable extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      count: 10,
      isLoading: true,
      columns: [
        {
          name: "organizationName",
          label: "Organization Name",
        },
        {
          name: "organizationTypeName",
          label: "Organization Type",
          options: {
            filter: true,
            viewColumns: true,
            display: "false",
          },
        },
        {
          name: "subscriptionStartDate",
          label: "Subscription Start Date",
          options: {
            customBodyRender: (value) => {
              return new Date(value).toLocaleDateString();
            },
          },
        },
        {
          name: "subscriptionEndDate",
          label: "Subscription End Date",
          options: {
            customBodyRender: (value) => {
              return new Date(value).toLocaleDateString();
            },
          },
        },
        {
          name: "contactEmail",
          label: "Contact Email",
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
          name: "storeCountLimit",
          label: "Store Count Limit",
          options: {
            viewColumns: true,
            display: "false"
          },
        },
        {
          name: "storeCount",
          label: "Store Count",
          options: {
            viewColumns: true,
            display: "false"
          },
        },
        {
          name: "countryName",
          label: "Country",
        },
        {
          name: "status",
          label: "Status",
          options: {
            filter: true,
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
      ],
      data: [],
    };
    this.getOrganizations(0);
  }

  getOrganizations = async (pageIndex, pageSize = 10) => {
    this.setState({ isLoading: true });
    const all = await this.getOrganizationsWithFilters(pageIndex, pageSize);
    this.setState({
      data: all.optometryOrganizationList,
      page: pageIndex,
      count: all.totalRecords,
      isLoading: false,
    });
  };

  getOrganizationsWithFilters = async (pageIndex, pageSize) => {
    const data = await getOrganizationsWithFilters(pageIndex, pageSize);
    return data;
  };

  onRowsSelect = (currentRowsSelected, allRowsSelected) => {
    console.log();
  };

  onPageChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.getOrganizations(tableState.page);
        break;
    }
  };
  render() {
    const { columns, data, page, count, isLoading } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: "multiselect",
      serverSide: true,
      selectableRowsHeader: false,
      disableToolbarSelect: true,
      selectableRows: "none",
      count: count,
      page: page,
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
          title="Optometric Organizations"
          data={data}
          columns={columns}
          options={options}
        />
        {isLoading && (
          <img
            src="/images/spinner.gif"
            alt="spinner"
            className={classes.circularProgress}
          />
        )}
      </div>
    );
  }
}

OrganizationListTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrganizationListTable);
