import { configureAxios, updateToken } from '../../axios';
import { logoutAction } from '../slices/account';
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
        user: state.account.user,
        token: state.account.token,
      },
      events: state.events,
      Intl: state.Intl,
    })
  );
  updateToken({ token: state.account.token });
});

configureAxios({
  logoutDispatcher: () => reduxStore.dispatch(logoutAction()),
});

export default reduxStore;
