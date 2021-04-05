import apiRequest from '../helpers/apiRequest';
import {
    fetchAction,
    detailAction,
    updateAction,
    searchAction,
  } from "dan-actions/StoreActions";
  import { serverInvokingStartedAction, serverInvokingStoppedAction } from "dan-actions/CommonActions";

export const getStoresWithFilters = async (pageNo,pageSize) => {

    serverInvokingStartedAction();
    const requestOptions = {
        method: 'GET',
        url : '/OptometryStore/ListPage',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Basic cGxhbm83NDp0ZXN0'
        },
        params: {
            pageindex: pageNo,
            pagesize: pageSize
        }
    };

    try {
        const loginRes = await apiRequest(requestOptions);
        fetchAction(loginRes.data);
        serverInvokingStoppedAction();
    } catch (error) {
        serverInvokingStoppedAction();
        throw error.data;
        
    }

}

export const getStores = async () => {

    const requestOptions = {
        method: 'GET',
        url : '/OptometryStore/GetAll',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Basic' : 'cGxhbm83NDp0ZXN0'
        }
    };

    try {
        const loginRes = await apiRequest(requestOptions);
        let asdacsad = loginRes;
        return loginRes;
    } catch (error) {
        throw error.data;
    }

}