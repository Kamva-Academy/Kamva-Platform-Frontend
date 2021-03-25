import Axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://zero.rastaiha.ir'
    : 'https://zero.rastaiha.ir';

const baseAxios = Axios.create({
  baseURL: baseURL + '/api/',
  timeout: 10000,
  maxRedirects: 5,
});

export const configureAxios = ({ logoutDispatcher }) => {
  baseAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logoutDispatcher();
      }
      return error;
    }
  );
};

export const updateToken = ({ token }) => {
  if (token) {
    baseAxios.defaults.headers.common['Authorization'] = 'JWT ' + token;
  } else {
    baseAxios.defaults.headers.common['Authorization'] = null;
    delete baseAxios.defaults.headers.common['Authorization'];
  }
};

export default baseAxios;
