import Axios from 'axios';
import { BASE_URL } from '../Constants';

const baseAxios = Axios.create({
  baseURL: BASE_URL + '/api/',
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
