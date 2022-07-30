import { createAction, createReducer } from '@reduxjs/toolkit';

export const closeNotificationAction = createAction('closeNotificationAction');
export const removeNotificationAction = createAction(
  'removeNotificationAction'
);
export const addNotificationAction = createAction('addNotificationAction');

export const notificationReducer = createReducer([], (builder) => {
  builder
    .addCase(
      closeNotificationAction,
      (state, { payload: { key, dismissAll } }) => {
        state.map((notification) =>
          dismissAll || notification.key === key
            ? { ...notification, dismissed: true }
            : { ...notification }
        );
      }
    )
    .addCase(removeNotificationAction, (state, { payload: { key } }) => {
      return state.filter((notification) => notification.key !== key);
    })
    .addCase(addNotificationAction, (state, action) => {
      const message = action?.payload?.message;
      const variant = action?.payload?.variant || action?.payload?.type;
      if (!message || !variant) return;
      state.push({
        key: new Date().getTime() + Math.random(),
        message,
        options: {
          variant,
          autoHideDuration: 3000,
        },
      });
    })
    .addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        if (!action?.payload?.message) return;
        state.push({
          key: new Date().getTime() + Math.random(),
          message: action.payload.message,
          options: {
            variant: 'error',
            autoHideDuration: 3000,
          },
        });
      }
    )
    .addMatcher(
      (action) => action.type.endsWith('/fulfilled'),
      (state, action) => {
        if (!action?.payload?.message) return;
        state.push({
          key: new Date().getTime() + Math.random(),
          message: action.payload.message,
          options: {
            variant: 'success',
            autoHideDuration: 3000,
          },
        });
      }
    );
});
