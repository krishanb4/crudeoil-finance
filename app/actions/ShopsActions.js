import * as types from '../constants/actionConstants';
import { serverInvokingStartedAction, serverInvokingStoppedAction } from "dan-actions/CommonActions";
import {openToastAction} from './ToastAction';
import apiRequest from '../redux/helpers/apiRequest';
import {getFormData} from '../utils/common';

export const addNewShop = (model) => {

    return  dispatch =>  {
      dispatch(serverInvokingStartedAction());
      const requestOptions = {
        method: 'POST',
        url : '/store/add',
        headers: {            
            'Authorization' : 'Basic cGxhbm83NDp0ZXN0'
        },
        data: getFormData(model)
        
    };

         apiRequest(requestOptions)
            .then(data => {
              dispatch(openToastAction({type : 'success' , message : 'New Shop successfully added'}));
              //dispatch(fetchAction()) NOTE : fetch shops when adding a new one
              dispatch(serverInvokingStoppedAction());
            },
            error  => {
              dispatch(serverInvokingStoppedAction());
              dispatch(openToastAction({type : 'error' , message : 'Error Ocurred'}));
            }
            ).catch(error => {
              dispatch(serverInvokingStoppedAction());
              dispatch(openToastAction({type : 'error' , message : `${error.message}`}));
            });
    };
   
};

const getStores =(data)=> {
  return {type: types.FETCH_STORE_DATA , data: data.data}
};
export const fetchAction = items => ({
  type: types.FETCH_SHOP_DATA,
  items,
});

export const searchAction = keyword => ({
  type: types.SEARCH_SHOP,
  keyword,
});

export const addAction = item => ({
    type: types.ADD_SHOP,
    item,
  });

export const updateAction = item => ({
  type: types.UPDATE_SHOP,
  item,
});

export const detailAction = item => ({
  type: types.SHOW_DETAIL_SHOP,
  item
});

