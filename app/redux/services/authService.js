import apiRequest from '../helpers/apiRequest';

export const login = async (userData) => {

    const userName = userData.email ;
    const password = userData.password ;
    const requestOptions = {
        method: 'POST',
        url : '/account/authenticate',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify({ userName, password })
    };

    try {
        const loginRes = await apiRequest(requestOptions);
        let asdacsad = loginRes;
        return loginRes;
    } catch (error) {
        throw error.data;
    }

    // return fetch(`${config.apiUrl}/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('user', JSON.stringify(user));
    //         return user;
    //     });
}