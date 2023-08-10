import Axios from 'axios';
import { BACKEND_URL } from 'configs/Constants';

const baseAxios = Axios.create({
  baseURL: BACKEND_URL + 'api/',
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
