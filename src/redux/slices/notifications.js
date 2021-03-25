import { createAction, createReducer } from '@reduxjs/toolkit';

export const closeNotificationAction = createAction('closeNotificationAction');
export const removeNotificationAction = createAction(
  'removeNotificationAction'
);
export const addNotificationAction = createAction('addNotificationAction');

export const notificationReducer = createReducer([], (builder) => {
  builder
    .addCase(closeNotificationAction, (state, action) => {
      state.map((notification) =>
        action.dismissAll || notification.key === action.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      );
    })
    .addCase(removeNotificationAction, (state, action) => {
      state.filter((notification) => notification.key !== action.key);
    })
    .addCase(addNotificationAction, (state, action) => {
      state.push({
        message: action.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: action.variant,
          autoHideDuration: 3000,
        },
      });
    })
    .addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        if (!action?.payload?.message) return;
        state.push({
          message: action.payload.message,
          options: {
            key: new Date().getTime() + Math.random(),
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
          message: action.payload.message,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            autoHideDuration: 3000,
          },
        });
      }
    );
});
