import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import AppointmentTable from "./Tables/AppointmentTable";

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Appointments extends Component {
  render() {
    const title = brand.name + " - Appointments";
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div>
          <AppointmentTable />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Appointments);
