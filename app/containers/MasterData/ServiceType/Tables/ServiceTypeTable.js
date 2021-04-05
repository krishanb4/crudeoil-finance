import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import { getServiceTypesWithFilters } from "../../../../redux/services/serviceTypeService";
import CrudToolbar from "../../../../components/Tables/CrudToolbar";

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
class ServiceTypeTable extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      count: 10,
      isLoading: false,
      columns: [
        {
          name: "serviceTypeName",
          label: "Service Type Name",
          options: {
            filter: true,
          },
        },
        {
          name: "serviceTypeDesc",
          label: "Service Type Des.",
          options: {
            filter: true,
          },
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
    this.getServiceTypes(0);
  }

  getServiceTypes = async (pageIndex, pageSize = 10) => {
    this.setState({ isLoading: true });
    const all = await this.getServiceTypesWithFilters(pageIndex, pageSize);
    this.setState({
      data: all.serviceTypeList,
      page: pageIndex,
      count: all.totalRecords,
      isLoading: false,
    });
  };

  getServiceTypesWithFilters = async (pageIndex, pageSize) => {
    const data = await getServiceTypesWithFilters(pageIndex, pageSize);
    return data;
  };

  onRowsSelect = (currentRowsSelected, allRowsSelected) => {
    console.log();
  };

  onPageChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.getServiceTypes(tableState.page);
        break;
    }
  };
  render() {
    const { columns, data, page, count, isLoading } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: "multiselect",
      filter: false,
      serverSide: true,
      selectableRowsHeader: true,
      disableToolbarSelect: true,
      selectableRows: "multiple",
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
          title="Service Types in the System"
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

ServiceTypeTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceTypeTable);
