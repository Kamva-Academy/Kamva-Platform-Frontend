import Axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://zero.rastaiha.ir'
    : 'https://zero.rastaiha.ir';

const axios = Axios.create({
  baseURL: baseURL + '/api/',
  timeout: 10000,
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
