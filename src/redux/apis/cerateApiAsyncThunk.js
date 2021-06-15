import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorHandler } from './errorHandler';
import { persianMessages } from './messages';

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
          : (response.code ?
            { message: persianMessages[response.code] } //todo: make cleaner + support english messages
            : {})),
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
