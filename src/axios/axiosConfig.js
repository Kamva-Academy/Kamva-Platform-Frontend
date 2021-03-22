import Axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://zero.rastaiha.ir/api/'
    : 'https://zero.rastaiha.ir/api/';

const axios = Axios.create({
  baseURL,
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
