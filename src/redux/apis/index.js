import baseAxios from '../../axios';
import jsonToFormData from '../../utils/jsonToFromDate';

export const postApi = async (url, body) =>
  (await baseAxios.post(url, body)).data;
export const postFormDataApi = async (url, body) =>
  (
    await baseAxios.post(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
export const getApi = async (url) => (await baseAxios.get(url)).data;
export const deleteApi = async (url, body) =>
  (await baseAxios.delete(url, body)).data;
