import * as types from '../constants/actionConstants';
import { serverInvokingStartedAction, serverInvokingStoppedAction } from "dan-actions/CommonActions";
import apiRequest from '../redux/helpers/apiRequest';

export const fetchAction = (pageIndex =0, pagesize =10) => {

    return  dispatch =>  {
      dispatch(serverInvokingStartedAction());
      const requestOptions = {
        method: 'GET',
        url : '/OptometryStore/ListPage',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Basic cGxhbm83NDp0ZXN0'
        },
        params: {
            pageIndex: pageIndex,
            pagesize: pagesize
        }
    };

         apiRequest(requestOptions)
            .then(data => {
              dispatch(getStores(data));
              dispatch(serverInvokingStoppedAction());
            },
            error  => {
              dispatch(serverInvokingStoppedAction());
            }
            ).catch(error => {
              dispatch(serverInvokingStoppedAction());
            });
    };
   
};

const getStores =(data)=> {
  return {type: types.FETCH_STORE_DATA , data: data.data}
};

export const searchAction = keyword => ({
  type: types.SEARCH_STORE,
  keyword,
});

export const addAction = item => ({
    type: types.ADD_STORE,
    item,
  });

export const updateAction = item => ({
  type: types.UPDATE_STORE,
  item,
});

export const detailAction = item => ({
  type: types.SHOW_DETAIL_STORE,
  item
});

