import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import StoreListTable from "./Tables/StoreListTable";
import Loading from "react-loading-bar";
import { getStoresWithFilters } from "../../redux/services/StoreService";
import StoreAddAndUpdate from "./Operations/StoreAddAndUpdate";
import {
  fetchAction,
  detailAction,
  updateAction,
  searchAction,
} from "dan-actions/StoreActions";
import { closeToastAction, openToastAction } from "dan-actions/ToastAction";

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
  },
};

class Stores extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      settingTitle: " Add new Optometry Store ",
    };
    
  }

  componentDidMount () {
    this.getStores(0);
  }
  getStores = async (pageIndex, pageSize = 10) => {
   
    this.props.fetchData(pageIndex, pageSize);
  };

  getStoresWithFilters = async (pageIndex, pageSize) => {
    const data = await getStoresWithFilters(pageIndex, pageSize);
    return data;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddOrUpdate = (value) => {
    this.setState({ open: true });
    this.props.updateShop(value);
  };

  sendValues = (values) => {};

  addNewStore =()=> {
    this.setState({ open: true });
  }

  render() {
    const title = brand.name + " -Optometric Stores";
    const description = brand.desc;
    const { settingTitle, open } = this.state;
    const { stores, pageIndex, pageSize, isLoading,totalItems } = this.props;
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
          <StoreListTable
            data={stores}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount = {totalItems}
            onAddClick = {this.addNewStore}
          />
        </div>
        <StoreAddAndUpdate
          open={open}
          handleClose={this.handleClose}
          title={settingTitle}
          onSubmit={this.sendValues}
        />
        <Loading
          show={isLoading}
          color="rgba(255,255,255,.9)"
          showSpinner={true}
        />
      </div>
    );
  }
}

Stores.propTypes = {
  classes: PropTypes.object,
  fetchData: PropTypes.func,
  removeItem: PropTypes.func,
  showDetail: PropTypes.func,
  search: PropTypes.func,
  stores: PropTypes.object,
  storeIndex: PropTypes.number,
  totalItems: PropTypes.number,
};

const reducer = "store";
const mapStateToProps = (state) => ({
  force: state, // force state from reducer
  stores: state.getIn([reducer, "stores"]),
  storeIndex: state.getIn([reducer, "storeIndex"]),
  totalItems: state.getIn([reducer, "totalItems"]),
  toastMessage: state.getIn(["toastMessage", "toastMessage"]),
  toastType: state.getIn(["toastMessage", "type"]),
  isLoading: state.getIn(["common", "isLoading"]),
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  updateShop: bindActionCreators(updateAction, dispatch),
  //removeShop: bindActionCreators(removeAction, dispatch),
  showDetail: bindActionCreators(detailAction, dispatch),
  closeToast: bindActionCreators(closeToastAction, dispatch),
  openToast: bindActionCreators(openToastAction, dispatch),
});

const StoreMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stores);

export default withStyles(styles)(StoreMapped);
