import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorHandler } from './errorHandler';

export const createAsyncThunkApi = (typePrefix, api, url, options) =>
  createAsyncThunk(typePrefix, async (input, { rejectWithValue, dispatch }) => {
    try {
      const body = options?.bodyCreator?.(input) || input;
      const stringUrl = typeof url === 'function' ? url(input) : url;

      const response = await api(stringUrl, body);
      if (options?.onSuccessAction) {
        dispatch(options?.onSuccessAction(response));
      }
      return {
        response,
        ...(options?.defaultNotification?.success
          ? { message: options.defaultNotification.success }
          : {}),
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
