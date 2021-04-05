import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { getUsersWithFilters } from "../../redux/services/userService";
import UserTable from "./Tables/UserTable";

const styles = {
  root: {
    flexGrow: 1,
  },
  circularProgress: {
    position: "fixed",
    top: "calc(50% - -5px)",
    left: "calc(50% - 45px)",
    zIndex: 10,
    opacity: 0.5,
  }
};

class Users extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pageIndex: 0,
      pageSize: 10,
      isLoading: true,
    };
    this.getUsers(0);
  }

  getUsers = async (pageIndex, pageSize = 10) => {
    try {
      const all = await this.getUsersWithFilter(pageIndex, pageSize);
      this.setState({
        data: all.userInfoList,
        page: pageIndex,
        count: all.totalRecords,
        isLoading: false,
      });
    } catch (error) {}
  };

  getUsersWithFilter = async (pageIndex, pageSize) => {
    try {
      const data = await getUsersWithFilters(pageIndex, pageSize);
      return data;
    } catch (error) {}
  };

  render() {
    const title = brand.name + " - Users";
    const description = brand.desc;
    const { data, pageIndex, pageSize,isLoading } = this.state;
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
          <UserTable data={data} pageIndex={pageIndex} pageSize={pageSize} />
        </div>
        {isLoading && (
          <img
            src="/images/spinner.gif"
            alt="spinner"
            className={this.props.classes.circularProgress}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Users);
