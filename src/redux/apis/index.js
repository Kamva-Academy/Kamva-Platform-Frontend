import baseAxios from '../../axios';
import jsonToFormData from '../../utils/jsonToFromDate';

const putApi = async (url, body) => (await baseAxios.put(url, body)).data;

const postApi = async (url, body) =>
  (
    await baseAxios.post(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

const patchApi = async (url, body) =>
  (
    await baseAxios.patch(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

const postFormDataApi = async (url, body) =>
  (
    await baseAxios.post(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

const getApi = async (url) => (await baseAxios.get(url)).data;

const deleteApi = async (url, body) => (await baseAxios.delete(url, body)).data;

export const Apis = {
  PUT: putApi,
  POST: postApi,
  PATCH: patchApi,
  POST_FORM_DATA: postFormDataApi,
  GET: getApi,
  DELETE: deleteApi,
};
