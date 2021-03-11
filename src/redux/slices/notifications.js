import { createSlice } from '@reduxjs/toolkit';

import { loginAction } from './account';

const actions = [
  {
    name: loginAction.fulfilled.toString(),
    variant: 'success',
    message: 'خوش آمدید!',
  },
  {
    name: loginAction.rejected.toString(),
    variant: 'error',
    message: 'ورود ناموفق! دوباره تلاش کنید.',
  },
];

const extraReducers = {};
actions.forEach(
  (action) =>
    (extraReducers[action.name] = (state) => [
      ...state,
      {
        message: action.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: action.variant,
          autoHideDuration: 3000,
        },
      },
    ])
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    close: (state, { payload }) => {
      state.map((notification) =>
        payload.dismissAll || notification.key === payload.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      );
    },
    remove: (state, { payload }) =>
      state.filter((notification) => notification.key !== payload.key),
  },
  extraReducers,
});

export const { setLocal: setLocalAction } = notificationSlice.actions;

export const { reducer: translatorReducer } = notificationSlice;
