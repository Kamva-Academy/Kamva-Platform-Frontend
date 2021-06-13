import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorHandler } from './errorHandler';

export const createAsyncThunkApi = (typePrefix, api, url, options) =>
  createAsyncThunk(typePrefix, async (input, { rejectWithValue, dispatch }) => {
    console.log(input);
    try {
      const body = options?.bodyCreator?.(input) || input;
      const stringUrl = typeof url === 'function' ? url(input) : url;

      console.log("####")
      const response = await api(stringUrl, body);
      console.log("####")

      if (options?.onSuccessAction) {
        dispatch(options?.onSuccessAction(response));
      }
      console.log(response)
      return {
        response,
        ...(options?.defaultNotification?.success
          ? { message: options.defaultNotification.success }
          : {}),//todo
      };
    } catch (error) {
      return errorHandler(
        error,
        dispatch,
        rejectWithValue,
        options?.defaultNotification?.error,
        options?.defaultNotification?.showHttpError || false
      );
    }
  });
