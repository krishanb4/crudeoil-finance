import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import PoolCard from '../../../components/CardPaper/PoolCard';
import ShopDetail from './ShopDetail';

const ShopGallery = ({
  showDetail,
  shopData,
  handleAddToCart,
  shopIndex,
  keyword,
  listView,
  tokens
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDetailOpen = shop => {
    setIsDetailOpen(true);
    showDetail(shop);
  };

  const handleClose = () => {
    setIsDetailOpen(false);
  };

  return (
    <div>
      <ShopDetail
        open={isDetailOpen}
        close={handleClose}
        detailContent={shopData}
        shopIndex={shopIndex}
        handleAddToCart={handleAddToCart}
      />
      <Grid container alignItems="flex-start" justify="flex-start" direction="row" spacing={3}>
        {shopData.map((shop, index) => {
          if (
            shop
              .get('name')
              .toLowerCase()
              .indexOf(keyword) === -1
          ) {
            return false;
          }         
          return (
            <Grid
              item
              md={listView === 'list' ? 12 : 3}
              sm={listView === 'list' ? 12 : 6}
              xs={12}
              key={index.toString()}
            >
              <PoolCard
                isListView={listView === 'list'}
                pool={shop}
                tokens ={tokens}
                index ={index}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

ShopGallery.propTypes = {
  shopData: PropTypes.object.isRequired,
  showDetail: PropTypes.func.isRequired,
  openAddOrUpdate: PropTypes.func.isRequired,
  deleteOpen: PropTypes.func,
  shopIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired,
};

export default ShopGallery;
