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
        Object.entries(arg?.parameters).map(entry => {
          stringUrl += `?${entry[0]}=${entry[1]}`
        })
      }

      const response = await api(stringUrl, body);

      // component self onSuccess action
      arg?.onSuccess?.();

      // function self onSuccess action
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
      // component self onFailure action
      arg?.onFailure?.();
      
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
