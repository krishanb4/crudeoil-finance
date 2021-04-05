import apiRequest from '../helpers/apiRequest';

export const getServiceTypesWithFilters = async (pageNo,pageSize) => {

    const requestOptions = {
        method: 'GET',
        url : '/ServiceType/ListPage',
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
        return loginRes.data;
    } catch (error) {
        throw error.data;
    }

}

export const getAllServiceTypes = async () => {

    const requestOptions = {
        method: 'GET',
        url : '/ServiceType/GetAll',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Basic' : 'cGxhbm83NDp0ZXN0'
        }
    };

    try {
        const loginRes = await apiRequest(requestOptions);
        return loginRes.data;
    } catch (error) {
        throw error.data;
    }

}