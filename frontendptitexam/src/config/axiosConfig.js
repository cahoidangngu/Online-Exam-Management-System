import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:9999',
});

Axios.interceptors.request.use(config => {
    const userToken = localStorage.getItem("userToken") == null ? {} : JSON.parse(localStorage.getItem("userToken"));
    if (userToken.token) {
        config.headers.Authorization = `Bearer ${userToken.token}`;
    }
    return config;
});
export default Axios;