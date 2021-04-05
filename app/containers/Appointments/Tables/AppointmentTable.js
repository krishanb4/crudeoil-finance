import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import { getAppointmentWithFilters } from "../../../redux/services/appointmentService";

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
class AppointmentTable extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      count: 10,
      isLoading: true,
      columns: [
        {
          name: "parentName",
          label: "Parent Name",
          options: {
            filter: true,
          },
        },
        {
          name: "childName",
          label: "Child Name",
          options: {
            filter: true,
          },
        },
        {
          name: "contactNo",
          label: "Contact No",
          options: {
            filter: true,
          },
        },
        {
          name: "parentEmail",
          label: "Parent Email",
          options: {
            filter: true,
          },
        },
        {
          name: "createdDate",
          label: "Created Date",
          options: {
            filter: true,
            customBodyRender: (value) => {
              return new Date(value).toLocaleDateString();
            }
          },
        },
        {
          name: "bookingDate",
          label: "Booked Date",
          options: {
            filter: true,
            customBodyRender: (value) => {
              return new Date(value).toLocaleDateString();
            }
          },
        },
        {
          name: "startTime",
          label: "Start Time",
          options: {
            filter: true,
          },
        },
        {
          name: "endTime",
          label: "End Time",
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
              if (value === 5) {
                return (
                  <Chip
                    label="CANCELED"
                    style={{ backgroundColor: "#E62189" }}
                    size="small"
                  />
                );
              }
              if (value === 1) {
                return (
                  <Chip
                    label="CONFIRMED"
                    style={{ backgroundColor: "#32D95F" }}
                    size="small"
                  />
                );
              }
              return <Chip label="Unknown" size="small"/>;
            },
          },
        },
      ],
      data: [],
    };
    this.getAppointments(0);
  }

  getAppointments = async (pageIndex) => {
    this.setState({ isLoading: true });
    const all = await this.getAppointmentsWithFilters(
      pageIndex,
      10,
      new Date("2020-02-20"),
      new Date("2020-04-17")
    );
    this.setState({
      data: all.appointmentBookingList,
      page: pageIndex,
      count: all.totalRecords,
      isLoading: false,
    });
  };

  getAppointmentsWithFilters = async (pageIndex,pageSize,startDate,endDate ) => {
  
    const data = await getAppointmentWithFilters(pageIndex,pageSize,startDate,endDate);
    return data;
  };
  onRowsSelect = (currentRowsSelected, allRowsSelected) => {
    console.log();
  };

  onPageChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.getAppointments(tableState.page);
        break;
    }
  };
  render() {
    const { columns, data, page, count, isLoading } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: "multiselect",
      serverSide: true,
      selectableRowsHeader : false,
      disableToolbarSelect : true,
      selectableRows : "none",
      count: count,
      page: page,
      onTableChange: this.onPageChange,
      responsive: "stacked",
      onRowsDelete: this.onRowsSelect,
      print: false,
      download :false,
      rowsPerPage: 10,
      setTableProps: () => {
        return {
          padding: "default",
          size: "small"
        };
      }
    };
    return (
      <div className={classes.table}>
        {isLoading && (
          <img
            src="/images/spinner.gif"
            alt="spinner"
            className={classes.circularProgress}
          />
        )}
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

AppointmentTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentTable);
