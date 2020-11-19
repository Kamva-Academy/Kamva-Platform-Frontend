import {
  WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from '@giantmachines/redux-websocket';

// account
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// student

//// گرفتن هم گروهی های یه آدم (در واقعیت چون ممکنه یه نفر توی چندتا گروه باشه، سرش بحثه، ولی چون الان تو ای‌لیمپیاد هرکی فقط تو یه گروهه، اوکیه )
export const TEAMMATES_REQUEST = 'TEAMMATES_REQUEST';
export const TEAMMATES_SUCCESS = 'TEAMMATES_SUCCESS';
export const TEAMMATES_FAILURE = 'TEAMMATES_FAILURE';

export const STUDENT_WORKSHOPS_REQUEST = 'STUDENT_WORKSHOPS_REQUEST';
export const STUDENT_WORKSHOPS_SUCCESS = 'STUDENT_WORKSHOPS_SUCCESS';
export const STUDENT_WORKSHOPS_FAILURE = 'STUDENT_WORKSHOPS_FAILURE';

// export const STATE_REQUEST = 'STATE_REQUEST'; //url: fsm/state method: post / playerId
// export const STATE_SUCCESS = 'STATE_SUCCESS';
// export const STATE_FAILURE = 'STATE_FAILURE';

export const CURRENT_STATE_REQUEST = 'CURRENT_STATE_REQUEST'; //utl: api/fsm/getcurrentState method: post / response.body: fsmId + stateName + widgets
export const CURRENT_STATE_SUCCESS = 'CURRENT_STATE_SUCCESS';
export const CURRENT_STATE_FAILURE = 'CURRENT_STATE_FAILURE';

export const CALL_MENTOR_REQUEST = 'CALL_MENTOR_REQUEST'; //utl: api/fsm/requestmentor method: post / body : {fsmId}
export const CALL_MENTOR_SUCCESS = 'CALL_MENTOR_SUCCESS';
export const CALL_MENTOR_FAILURE = 'CALL_MENTOR_FAILURE';

export const GO_FORWARD_REQUEST = 'GO_FORWARD_REQUEST'; //utl: api/fsm/goforward method: post / body : {fsmId}
export const GO_FORWARD_SUCCESS = 'GO_FORWARD_SUCCESS';
export const GO_FORWARD_FAILURE = 'GO_FORWARD_FAILURE';

export const GO_BACKWARD_REQUEST = 'GO_BACKWARD_REQUEST'; //utl: api/fsm/backforward method: post / body : {fsmId}
export const GO_BACKWARD_SUCCESS = 'GO_BACKWARD_SUCCESS';
export const GO_BACKWARD_FAILURE = 'GO_BACKWARD_FAILURE';

// mentor

////////////// all notifications:
export const UNREAD_NOTIFICATIONS_REQUEST = 'UNREAD_NOTIFICATIONS_REQUEST'; //utl: notifications/api/unread_list (?) method: get
export const UNREAD_NOTIFICATIONS_SUCCESS = 'UNREAD_NOTIFICATIONS_SUCCESS';
export const UNREAD_NOTIFICATIONS_FAILURE = 'UNREAD_NOTIFICATIONS_FAILURE';

////////////// all workShops:
export const ALL_WORKSHOPS_REQUEST = 'ALL_WORKSHOPS_REQUEST'; //utl: api/fsm/fsm method: get /
export const ALL_WORKSHOPS_SUCCESS = 'ALL_WORKSHOPS_SUCCESS';
export const ALL_WORKSHOPS_FAILURE = 'ALL_WORKSHOPS_FAILURE';

////////////// get workShop:
export const GET_WORKSHOP_REQUEST = 'GET_WORKSHOP_REQUEST'; //utl: api/fsm/fsm method: get /
export const GET_WORKSHOP_SUCCESS = 'GET_WORKSHOP_SUCCESS';
export const GET_WORKSHOP_FAILURE = 'GET_WORKSHOP_FAILURE';

////////////// خود تیم‌ها
export const WORKSHOP_TEAMS_REQUEST = 'WORKSHOP_TEAMS_REQUEST'; //url: api/fsm/teams method: post / body: {fsmId}
export const WORKSHOP_TEAMS_SUCCESS = 'WORKSHOP_TEAMS_SUCCESS';
export const WORKSHOP_TEAMS_FAILURE = 'WORKSHOP_TEAMS_FAILURE';

////////////// جواب‌های یک تیم
export const TEAM_ANSWERS_REQUEST = 'TEAM_ANSWERS_REQUEST'; //url: api/fsm/submittedanswers method: post / body: {fsmId + teamId}
export const TEAM_ANSWERS_SUCCESS = 'TEAM_ANSWERS_SUCCESS';
export const TEAM_ANSWERS_FAILURE = 'TEAM_ANSWERS_FAILURE';

////////////// مشاهده‌ی تیم(که نوتیف رو خاموش کنه)
export const VISIT_TEAM_REQUEST = 'VISIT_TEAM_REQUEST'; //url: api/fsm/gototeam method: post / body: {fsmId + teamId}
export const VISIT_TEAM_SUCCESS = 'VISIT_TEAM_SUCCESS';
export const VISIT_TEAM_FAILURE = 'VISIT_TEAM_FAILURE';

// create workshop
export const CREATE_WORKSHOP_REQUEST = 'CREATE_WORKSHOP_REQUEST';
export const CREATE_WORKSHOP_SUCCESS = 'CREATE_WORKSHOP_SUCCESS';
export const CREATE_WORKSHOP_FAILURE = 'CREATE_WORKSHOP_FAILURE';

// create state
export const CREATE_STATE_REQUEST = 'CREATE_STATE_REQUEST';
export const CREATE_STATE_SUCCESS = 'CREATE_STATE_SUCCESS';
export const CREATE_STATE_FAILURE = 'CREATE_STATE_FAILURE';

// delete state
export const DELETE_STATE_REQUEST = 'DELETE_STATE_REQUEST';
export const DELETE_STATE_SUCCESS = 'DELETE_STATE_SUCCESS';
export const DELETE_STATE_FAILURE = 'DELETE_STATE_FAILURE';

//////////////// create widget
export const CREATE_WIDGET_REQUEST = 'CREATE_WIDGET_REQUEST';
export const CREATE_WIDGET_SUCCESS = 'CREATE_WIDGET_SUCCESS';
export const CREATE_WIDGET_FAILURE = 'CREATE_WIDGET_FAILURE';

//////////////// delete widget
export const DELETE_WIDGET_REQUEST = 'DELETE_WIDGET_REQUEST';
export const DELETE_WIDGET_SUCCESS = 'DELETE_WIDGET_SUCCESS';
export const DELETE_WIDGET_FAILURE = 'DELETE_WIDGET_FAILURE';

//////////////// get widget
export const GET_WIDGET_REQUEST = 'GET_WIDGET_REQUEST';
export const GET_WIDGET_SUCCESS = 'GET_WIDGET_SUCCESS';
export const GET_WIDGET_FAILURE = 'GET_WIDGET_FAILURE';

// snackbar (بی‌ربط به بک‌اند)

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

// whiteBoard:
export const DESELECT_NODE = 'DESELECT_NODE';
export const DESELECT_NODES = 'DESELECT_NODES';
export const SELECT_NODE = 'SELECT_NODE';
export const ADD_NODE = 'ADD_NODE';
export const UPDATE_SHAPE_PROPS = 'UPDATE_SHAPE_PROPS';
export const CHANGE_MODE = 'CHANGE_MODE';
export const REMOVE_SELECTED_NODES = 'REMOVE_SELECTED_NODES';
export const REMOVE_NODE = 'REMOVE_NODE';
export const INIT_WHITEBOARD = 'INIT_WHITEBOARD';

// websocket
export const REDUX_WEBSOCKET_BROKEN = `REDUX_WEBSOCKET::${WEBSOCKET_BROKEN}`;
export const REDUX_WEBSOCKET_OPEN = `REDUX_WEBSOCKET::${WEBSOCKET_OPEN}`;
export const REDUX_WEBSOCKET_CLOSED = `REDUX_WEBSOCKET::${WEBSOCKET_CLOSED}`;
export const REDUX_WEBSOCKET_MESSAGE = `REDUX_WEBSOCKET::${WEBSOCKET_MESSAGE}`;
export const REDUX_WEBSOCKET_CONNECT = `REDUX_WEBSOCKET::${WEBSOCKET_CONNECT}`;
export const REDUX_WEBSOCKET_DISCONNECT = `REDUX_WEBSOCKET::${WEBSOCKET_DISCONNECT}`;
export const REDUX_WEBSOCKET_SEND = `REDUX_WEBSOCKET::${WEBSOCKET_SEND}`;

export const REDUX_UPDATE_WHITEBOARD = `REDUX_WEBSOCKET::UPDATE_WHITEBOARD`;

// Redirect
export const REDIRECT = 'REDIRECT';
export const INIT_REDIRECT = 'INIT_REDIRECT';
