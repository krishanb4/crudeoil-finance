import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import MUIDataTable from "mui-datatables";
import Chip from "@material-ui/core/Chip";
import { getPremiumInfoWithFilters } from "../../../redux/services/premiumInfoService";
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
class PremiumInfoTable extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      count: 10,
      isLoading: true,
      columns: [
        {
          name: "storeName",
          label: "Store Name",
        },
        {
          name: "title",
          label: "Title",
        },
        {
          name: "description",
          label: "Description",
        },
        {
          name: "redirectUrl",
          label: "Url", 
          options: {
            customBodyRender: (value) => {
              return <a href={value}>Link</a>;
            },
          },
        },
        {
          name: "entryDate",
          label: "Entry Date",
          options: {
            filter: true,
            customBodyRender: (value) => {
              return new Date(value).toLocaleDateString();
            }
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
    this.getPremiumInfo(0);
  }

  getPremiumInfo = async (pageIndex, pageSize = 10) => {
    this.setState({ isLoading: true });
    const all = await this.getPremiumInfoWithFilters(pageIndex, pageSize);
    this.setState({
      data: all.premiumInfoList,
      page: pageIndex,
      count: all.totalRecords,
      isLoading: false,
    });
  };

  getPremiumInfoWithFilters = async (pageIndex, pageSize) => {
    const data = await getPremiumInfoWithFilters(pageIndex, pageSize);
    return data;
  };

  onRowsSelect = (currentRowsSelected, allRowsSelected) => {
    console.log();
  };

  onPageChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.getPremiumInfo(tableState.page);
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
          title="Optometric Store's Premium Info"
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

PremiumInfoTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PremiumInfoTable);
