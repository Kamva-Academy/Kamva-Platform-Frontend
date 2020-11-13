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

//////////////// create widget
export const CREATE_WIDGET_REQUEST = 'CREATE_WIDGET_REQUEST';
export const CREATE_WIDGET_SUCCESS = 'CREATE_WIDGET_SUCCESS';
export const CREATE_WIDGET_FAILURE = 'CREATE_WIDGET_FAILURE';


// snackbar (بی‌ربط به بک‌اند)

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';
