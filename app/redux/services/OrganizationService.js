import apiRequest from '../helpers/apiRequest';

export const getOrganizationsWithFilters = async (pageNo,pageSize) => {

    const requestOptions = {
        method: 'GET',
        url : '/OptometryOrganization/ListPage',
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

export const getOrganizations = async () => {

    const requestOptions = {
        method: 'GET',
        url : '/OptometryOrganization/GetAll',
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