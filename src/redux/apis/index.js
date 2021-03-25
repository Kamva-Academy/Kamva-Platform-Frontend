import axios from '../../axios/axiosConfig';
import jsonToFormData from '../../utils/jsonToFromDate';

export const postApi = async (url, body) => (await axios.post(url, body)).data;
export const postFormDataApi = async (url, body) =>
  (
    await axios.post(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
export const getApi = async (url) => (await axios.get(url)).data;
export const deleteApi = async (url, body) =>
  (await axios.delete(url, body)).data;
