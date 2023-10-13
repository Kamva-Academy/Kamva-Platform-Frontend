import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

import errorHandler from './errorHandler';

type CreateAsyncThunkApiType =
  (
    typePrefix: string,
    api: any,
    url: Function | string,
    option?: any,
  ) => AsyncThunk<any, any, {}>

export const createAsyncThunkApi: CreateAsyncThunkApiType = (typePrefix, api, url, options) =>
  createAsyncThunk(typePrefix, async (arg, { rejectWithValue, dispatch, getState }) => {
    try {
      const body = options?.bodyCreator?.(arg) || arg;
      let stringUrl = typeof url === 'function' ? url(arg) : url;

      if (arg?.parameters) {
        for (const parameter of arg?.parameters) {
          stringUrl += `?${parameter[0]}=${parameter[1]}`
        }
      }

      const response = await api(stringUrl, body);

      if (options?.onSuccessAction) {
        dispatch(options?.onSuccessAction({ response, arg, options }));
      }

      return {
        response,
        ...(options?.defaultNotification?.success
          ? { message: options.defaultNotification.success }
          : {})
      };
    } catch (error) {
      if ((getState() as any).Intl.locale == 'fa') {
        return errorHandler(
          getState(),
          error,
          dispatch,
          rejectWithValue,
          options?.defaultNotification?.error,
          options?.defaultNotification?.showHttpError || false
        );
      }
    }
  });
