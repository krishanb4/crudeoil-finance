import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import ShopCard from "../../../components/CardPaper/ShopCard";
import ShopDetail from "./ShopDetail";

class ShopGallery extends React.Component {
  state = {
    isDetailOpen: false,
  };

  handleDetailOpen = (shop) => {
    const { showDetail } = this.props;
    this.setState({ isDetailOpen: true });
    showDetail(shop);
  };

  handleClose = () => {
    this.setState({ isDetailOpen: false });
  };

  render() {
    const { isDetailOpen } = this.state;
    const {
      shopData,
      handleAddToCart,
      shopIndex,
      keyword,
      listView,
      openAddOrUpdate,
      deleteOpen
    } = this.props;

    return (
      <div>
        <ShopDetail
          open={isDetailOpen}
          close={this.handleClose}
          detailContent={shopData}
          shopIndex={shopIndex}
          handleAddToCart={handleAddToCart}
        />
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={3}
        >
          {shopData.map((shop, index) => {
            if (
              shop
                .get("name")
                .toLowerCase()
                .indexOf(keyword) === -1
            ) {
              return false;
            }
            return (
              <Grid
                item
                md={listView === "list" ? 12 : 3}
                sm={listView === "list" ? 12 : 6}
                xs={12}
                key={index.toString()}
              >
                <ShopCard
                  list={listView === "list"}
                  data={shop}
                  detailOpen={() => this.handleDetailOpen(shop)}
                  addOrUpdateOpen={() => openAddOrUpdate(shop)}
                  deleteOpen = {()=> deleteOpen(shop)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

ShopGallery.propTypes = {
  shopData: PropTypes.object.isRequired,
  showDetail: PropTypes.func.isRequired,
  openAddOrUpdate : PropTypes.func.isRequired,
  deleteOpen : PropTypes.func,
  shopIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired,
};

export default ShopGallery;
