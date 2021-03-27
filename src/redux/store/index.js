import { updateToken } from '../../axios';
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

export default reduxStore;
