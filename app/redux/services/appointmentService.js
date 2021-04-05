import apiRequest from '../helpers/apiRequest';

export const getAppointmentWithFilters = async (pageNo,pageSize,startDate,endDate) => {

    const requestOptions = {
        method: 'GET',
        url : '/AppointmentBooking/ListPage',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization' : 'Basic cGxhbm83NDp0ZXN0'
        },
        params: {
            startdate : startDate,
            enddate : endDate,
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

export const getAppointments = async () => {

    const requestOptions = {
        method: 'GET',
        url : '/appointmentbooking/getAll',
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