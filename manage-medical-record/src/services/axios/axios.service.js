import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';

axios.interceptors.request.use((request) => {
    if (request.url !== '/user/register' && request.url !== '/user/login') {
        const user = JSON.parse(localStorage.getItem('user'));

        request.headers.authentication = user?.accessToken || "";
    }

    return request;
});

axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default axios;
