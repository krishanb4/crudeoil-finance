import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import PoolCard from '../../../components/CardPaper/PoolCard';

const ShopGallery = ({
  pools,
  keyword,
  listView,
  tokens,
  apys
}) => {
  
  return (
    <div>      
      <Grid container alignItems="flex-start" justify="flex-start" direction="row" spacing={3}>
        {pools.map((pool, index) => {
          if (
            pool
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
                pool={pool}
                tokens ={tokens}
                apys ={apys}
                key ={pool.get('id')}
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
  pools: PropTypes.object.isRequired,
  apys: PropTypes.object,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired,
};

export default ShopGallery;
