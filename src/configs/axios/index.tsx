import Axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://backend.rastaiha.ir'
    : 'http://localhost:8000'

const baseAxios = Axios.create({
  baseURL: baseURL + '/api/',
  timeout: 60000,
  maxRedirects: 5,
});

export const updateToken = (token: string): void => {
  if (token) {
    baseAxios.defaults.headers.common['Authorization'] = 'JWT ' + token;
  } else {
    baseAxios.defaults.headers.common['Authorization'] = null;
    delete baseAxios.defaults.headers.common['Authorization'];
  }
};

export default baseAxios;
