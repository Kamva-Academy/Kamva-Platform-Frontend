import baseAxios from 'configs/axios';
import jsonToFormData from 'utils/jsonToFromDate';

const putApi = async (url, body) => (await baseAxios.put(url, body)).data;

const postApi = async (url, body) => (await baseAxios.post(url, body)).data;

const patchApi = async (url, body) => (await baseAxios.patch(url, body)).data;

const postFormDataApi = async (url, body) =>
  (
    await baseAxios.post(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

const patchFormDataApi = async (url, body) =>
  (
    await baseAxios.patch(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

const longLastingPostFormDataApi = async (url, body) =>
  (
    await baseAxios.post(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10 * 60 * 1000,
    })
  ).data;

const longLastingPatchFormDataApi = async (url, body) =>
  (
    await baseAxios.patch(url, jsonToFormData(body), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10 * 60 * 1000,
    })
  ).data;

const getApi = async (url) => (await baseAxios.get(url)).data;

const deleteApi = async (url, body) => (await baseAxios.delete(url, body)).data;

export const Apis = {
  PUT: putApi,
  POST: postApi,
  PATCH: patchApi,
  POST_FORM_DATA: postFormDataApi,
  PATCH_FORM_DATA: patchFormDataApi,
  LONG_LASTING_POST_FORM_DATA: longLastingPostFormDataApi,
  LONG_LASTING_PATCH_FORM_DATA: longLastingPatchFormDataApi,
  GET: getApi,
  DELETE: deleteApi,
};
