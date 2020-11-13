import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, refresh: null, user: {} };

function account(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default account;
