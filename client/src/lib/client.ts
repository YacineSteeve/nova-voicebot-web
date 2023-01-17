import axios from 'axios';

const novaApi = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken'
});

export default novaApi;
