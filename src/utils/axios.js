import axios from 'axios';
const axiosInstance = axios.create({
    timeout: 5000
})

axiosInstance.defaults.baseURL = 'http://www.json-generator.com/api/json/get';

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {
    // based on response display the error message
    const result = response.data;
    if (response.status != 200) {
        return Promise.reject();
    } else {
        return response;
    }
}, (error) => {
    // Do something with response error
    return Promise.reject(error);
});
export default axiosInstance;