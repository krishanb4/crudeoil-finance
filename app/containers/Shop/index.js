import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/shopData';
import { Toast } from 'dan-components';
import SearchShop from './Operations/SearchShop';
import ShopGallery from './Operations/ShopGallery';
import ShopAddUpdate from './Operations/ShopAddUpdate';
import Button from '@material-ui/core/Button';
import { closeToastAction, openToastAction } from 'dan-actions/ToastAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { formatDate } from '../../utils/common';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { Pagination } from '../../components';
import {
  fetchAction,
  connectWallet,
  disconnectWallet,
  detailAction,
  updateAction,
  searchAction,
  addAction,
  addNewShop,
} from 'dan-actions/ShopsActions';
import { reset } from 'redux-form';
import Ionicon from 'react-ionicons';

const initData = {
  name: '',
  email: '',
  address: '',
  telephone: '',
  mobile: '',
  closedFrom: formatDate(new Date(new Date().setDate(new Date().getDate() - 20))),
  closedTo: formatDate(new Date(new Date().setDate(new Date().getDate() - 4))),
  categoryId: '',
  description: '',
};

const Shop = ({
  shopData,
  checkout,
  showDetail,
  shopIndex,
  totalItems,
  search,
  keyword,
  toastMessage,
  toastType,
  closeToast,
  classes,
  isLoading,
  fetchData,
  addNew,
  resetForm,
  updateShop,
  saveNewShop,
}) => {
  const [listView, setListView] = useState('grid');
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settingTitle, setSettingTitle] = useState(' Add new Shop ');
  const [page, setPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(1);

  useEffect(() => {
    fetchData(data);
  }, []);

  const handleClickOpen = title => {
    setOpen(true);
    addNew(initData);
  };

  const handleClose = () => {
    resetForm('formAddOrUpdateShop');
    setOpen(false);
  };

  const handleSwitchView = (event, value) => {
    setListView(value);
  };

  const handleAddOrUpdate = value => {
    setOpen(true);
    updateShop(value);
  };

  const sendValues = (values, image) => {
    if (values) {
      const formValue = {};
      values.map((val, i) => {
        formValue[i] = val;
      });
      formValue['image'] = image;
      saveNewShop(formValue);
      handleClose();
    }
  };

  const OpenDeleteModal = shop => {
    setIsModalOpen(true);
  };

  const onConfirmDelete = () => {
    setIsModalOpen(false);
  };

  const onRejectDelete = () => {
    setIsModalOpen(false);
  };
  const onPageChange = page => {
    setPage(page);
  };

  const onPrev = () => {
    if (page > 1) {
      setPage(page => (page -= 1));
    } else {
      setPage(1);
    }
  };

  const onNext = totalPages => {
    if (page < totalPages) {
      setPage(page => (page += 1));
    } else {
      setPage(totalPages);
    }
  };

  const onGoFirst = () => {
    setPage(1);
  };

  const onGoLast = totalPages => {
    setPage(totalPages);
  };

  const title = brand.name + ' - Optimizer';
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
      <Toast message={toastMessage} type={toastType} onClose={() => closeToast()} />
      <div className={classes.headDetails}>
        <span className={classes.tvlText}>TVL : $0.00</span>
        <span className={classes.depositedText}>Deposited : $0.00</span>
        <span className={classes.detailsText}>
          There is a 0.05%-0.1% withdrawal or deposit fee on all vaults
        </span>
      </div>

      <div className={classes.disclaimer}>
        <Ionicon icon="ios-alert" />
        <span className={classes.disclaimertext}>
          Using Smart Contracts, Tokens, and Crypto is always a risk. DYOR before investing.
        </span>
      </div>

      <SearchShop
        shopData={shopData}
        checkout={checkout}
        totalItems={totalItems}
        search={search}
        keyword={keyword}
        listView={listView}
        handleSwitchView={handleSwitchView}
      />
      <ShopGallery
        listView={listView}
        shopData={shopData}
        showDetail={showDetail}
        openAddOrUpdate={handleAddOrUpdate}
        deleteOpen={OpenDeleteModal}
        shopIndex={shopIndex}
        keyword={keyword}
      />
      <ShopAddUpdate
        open={open}
        handleClose={handleClose}
        title={settingTitle}
        onSubmit={sendValues}
        afterDataValidate={sendValues}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        onAgree={onConfirmDelete}
        onDisagree={onRejectDelete}
      />
      <Pagination
        curpage={page}
        totpages={10}
        boundaryPagesRange={1}
        onChange={onPageChange}
        siblingPagesRange={1}
        hideEllipsis={false}
        onPrev={onPrev}
        onNext={() => onNext(pageNumbers.length)}
        onGoFirst={onGoFirst}
        onGoLast={() => onGoLast(pageNumbers.length)}
      />
      {isLoading && (
        <img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />
      )}
    </div>
  );
};

Shop.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  shopData: PropTypes.object.isRequired,
  shopIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

const reducer = 'shop';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  keyword: state.getIn([reducer, 'keywordValue']),
  shopData: state.getIn([reducer, 'list']),
  shopIndex: state.getIn([reducer, 'shopIndex']),
  totalItems: state.getIn([reducer, 'totalItems']),
  toastMessage: state.getIn(['toastMessage', 'toastMessage']),
  toastType: state.getIn(['toastMessage', 'type']),
  isLoading: state.getIn(['common', 'isLoading']),
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  connectWallet: bindActionCreators(connectWallet, dispatch),
  disconnectWallet: bindActionCreators(disconnectWallet, dispatch),
  showDetail: bindActionCreators(detailAction, dispatch),
  closeToast: bindActionCreators(closeToastAction, dispatch),
  openToast: bindActionCreators(openToastAction, dispatch),
});

const ShopMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);

export default withStyles(styles)(ShopMapped);

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },

  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  disclaimer: {
    backgroundColor: '#FEEFB3',
    fontSize: '14px',
    padding: '5px 15px',
    fontWeight: '600',
    color: '#9F6000',
    borderRadius: '7px',
  },
  disclaimertext: {
    marginLeft: '5px',
  },
  headDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 10,
    marginTop: '-20px',
  },
  tvlText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 600,
  },
  depositedText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 400,
  },
  detailsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 400,
  },
});
