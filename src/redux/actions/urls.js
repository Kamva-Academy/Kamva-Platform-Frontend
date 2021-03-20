export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://zero.rastaiha.ir/'
    : 'https://dev.rastaiha.ir/';

export const API_ROOT = ROOT + 'api/'

// account

export const REGISTRATION = API_ROOT.concat('auth/signup/');
export const VERIFY_CODE = API_ROOT.concat('auth/sendVerify/');
export const TEAM_DATA = API_ROOT.concat('auth/teamData/');
export const CHANGE_PASSWORD = API_ROOT.concat('auth/changepass/');
export const LOGIN = API_ROOT.concat('auth/token/obtain/');
export const LOGOUT = API_ROOT.concat('auth/logout/');

// dashboard

export const EVENT_REGISTRATION_INFO = API_ROOT.concat('auth/registration-info/');
export const SUBMIT_DISCOUNT = API_ROOT.concat('auth/verify-discount/');


// payment
export const PAYMENT = API_ROOT.concat('auth/pay/');




export const CALL_MENTOR = API_ROOT.concat('fsm/requestmentor/');
export const GO_FORWARD = API_ROOT.concat('fsm/goforward/');
export const GO_BACKWARD = API_ROOT.concat('fsm/gobackward/');


export const UNREAD_NOTIFICATIONS = API_ROOT.concat(
  'notifications/api/unread_list/'
);
export const CREATE_WORKSHOP = API_ROOT.concat('fsm/fsm/');
export const CREATE_ARTICLE = API_ROOT.concat('fsm/article/');
export const CREATE_STATE = API_ROOT.concat('fsm/state/');

export const ALL_WORKSHOPS = API_ROOT.concat('fsm/fsm/');
export const ALL_ARTICLES = API_ROOT.concat('fsm/article/');
export const GET_WORKSHOP = (id) => API_ROOT.concat(`fsm/fsm/${id}/`);
export const GET_ARTICLE = (id) => API_ROOT.concat(`fsm/article/${id}/`);
export const GET_STATE = (id) => API_ROOT.concat(`fsm/state/${id}/`);
export const MENTOR_GET_WORKSHOP = API_ROOT.concat(`fsm/mentorgetplayerfsm/`);

export const MENTOR_GET_CURRENT_STATE = API_ROOT.concat(
  `fsm/mentorgetplayerstate/`
);
export const PARTICIPANT_GET_CURRENT_STATE = API_ROOT.concat(
  `fsm/getcurrentstate/`
);
export const DELETE_STATE = (id) => API_ROOT.concat(`fsm/state/${id}/`);
export const WORKSHOP_TEAMS = API_ROOT.concat('fsm/workshopplayers/');
export const TEAM_ANSWERS = API_ROOT.concat('fsm/submittedanswers/');
export const VISIT_PLAYER_WORKSHOP = API_ROOT.concat('fsm/visitteam/');

export const SEND_ANSWER = API_ROOT.concat('fsm/sendanswer/');
export const START_WORKSHOP = API_ROOT.concat('fsm/startWorkshop/');

export const CREATE_WIDGET = API_ROOT.concat('fsm/widget/');
export const DELETE_WIDGET = (id) => API_ROOT.concat(`fsm/widget/${id}/`);

export const CREATE_HELP = API_ROOT.concat('fsm/helpstate/');


export const GET_LANDING = `https://res.cloudinary.com/dflcxtpro/raw/upload/v${Math.floor(
  Math.random() * 10000000
)}/rasta/landing-zero-v3_d5lbgq.json`;