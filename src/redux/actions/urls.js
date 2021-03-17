export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://zero.rastaiha.ir/api/'
    : 'https://dev.rastaiha.ir/api/';

// account

export const REGISTRATION = ROOT.concat('auth/signup/');
export const VERIFY_CODE = ROOT.concat('auth/sendVerify/');
export const TEAM_DATA = ROOT.concat('auth/teamData/');
export const CHANGE_PASSWORD = ROOT.concat('auth/changepass/');
export const LOGIN = ROOT.concat('auth/token/obtain/');
export const LOGOUT = ROOT.concat('auth/logout/');
export const CHECK_PAYMENT = ROOT.concat('auth/pay/');

// dashboard

export const EVENT_REGISTRATION_INFO = ROOT.concat('auth/registration-info/');
export const SUBMIT_DISCOUNT = ROOT.concat('auth/verify-discount/');






export const CALL_MENTOR = ROOT.concat('fsm/requestmentor/');
export const GO_FORWARD = ROOT.concat('fsm/goforward/');
export const GO_BACKWARD = ROOT.concat('fsm/gobackward/');


export const UNREAD_NOTIFICATIONS = ROOT.concat(
  'notifications/api/unread_list/'
);
export const CREATE_WORKSHOP = ROOT.concat('fsm/fsm/');
export const CREATE_ARTICLE = ROOT.concat('fsm/article/');
export const CREATE_STATE = ROOT.concat('fsm/state/');

export const ALL_WORKSHOPS = ROOT.concat('fsm/fsm/');
export const ALL_ARTICLES = ROOT.concat('fsm/article/');
export const GET_WORKSHOP = (id) => ROOT.concat(`fsm/fsm/${id}/`);
export const GET_ARTICLE = (id) => ROOT.concat(`fsm/article/${id}/`);
export const GET_STATE = (id) => ROOT.concat(`fsm/state/${id}/`);
export const MENTOR_GET_WORKSHOP = ROOT.concat(`fsm/mentorgetplayerfsm/`);

export const MENTOR_GET_CURRENT_STATE = ROOT.concat(
  `fsm/mentorgetplayerstate/`
);
export const PARTICIPANT_GET_CURRENT_STATE = ROOT.concat(
  `fsm/getcurrentstate/`
);
export const DELETE_STATE = (id) => ROOT.concat(`fsm/state/${id}/`);
export const WORKSHOP_TEAMS = ROOT.concat('fsm/workshopplayers/');
export const TEAM_ANSWERS = ROOT.concat('fsm/submittedanswers/');
export const VISIT_PLAYER_WORKSHOP = ROOT.concat('fsm/visitteam/');

export const SEND_ANSWER = ROOT.concat('fsm/sendanswer/');
export const START_WORKSHOP = ROOT.concat('fsm/startWorkshop/');

export const CREATE_WIDGET = ROOT.concat('fsm/widget/');
export const DELETE_WIDGET = (id) => ROOT.concat(`fsm/widget/${id}/`);

export const CREATE_HELP = ROOT.concat('fsm/helpstate/');


export const GET_LANDING = `https://res.cloudinary.com/dflcxtpro/raw/upload/v${Math.floor(
  Math.random() * 10000000
)}/rasta/landing-zero-v3_d5lbgq.json`;