import { updateToken } from '../../axios';
import { mentorInitialState } from '../slices/mentor';
import createStore from './createStore';

const removeOldJsonData = (delta, data = {}) => {
  for (const key in data) {
    if (Date.now() > data[key].lastUpdate + delta) {
      delete data[key];
    }
  }
};

const persistedState = localStorage.getItem('rastaState')
  ? JSON.parse(localStorage.getItem('rastaState'))
  : {};

removeOldJsonData(108000000, persistedState?.mentor?.teams);

persistedState.mentor = {
  ...mentorInitialState,
  ...persistedState.mentor,
};

const reduxStore = createStore(persistedState);

reduxStore.subscribe(() => {
  const state = reduxStore.getState();
  localStorage.setItem(
    'rastaState',
    JSON.stringify({
      // account: state.account,
      account: {
        user: state.account.userAccount || state.account.userProfile,
        token: state.account.token,
      },
      // mentor: {
      //   teams: state.mentor.teams,
      // },
      // events: state.events,
      Intl: state.Intl,
    })
  );
  updateToken({ token: state.account.token });
});

export default reduxStore;
