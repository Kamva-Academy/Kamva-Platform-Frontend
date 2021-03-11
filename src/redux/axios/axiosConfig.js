import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 1000,
  maxRedirects: 5,
});

export const axiosConfig = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default axios;
