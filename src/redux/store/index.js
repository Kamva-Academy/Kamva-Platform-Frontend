import { updateToken } from '../../configs/axios';
import createStore from './createStore';

const persistedState = localStorage.getItem('rastaState')
  ? JSON.parse(localStorage.getItem('rastaState'))
  : {};

const reduxStore = createStore(persistedState);

reduxStore.subscribe(() => {
  const state = reduxStore.getState();
  localStorage.setItem(
    'rastaState',
    JSON.stringify({
      account: {
        userAccount: {
          ...state.account.userAccount,
          ...state.account.userProfile,
        },
        token: state.account.token,
        refresh: state.account.refresh,
      },
      Intl: state.Intl,
    })
  );
  updateToken(state.account.token);
});

export default reduxStore;
