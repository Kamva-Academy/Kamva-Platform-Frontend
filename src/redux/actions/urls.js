export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://rastaiha.ir/api/'
    : 'http://127.0.0.1:3000/api/';


export const LOGIN = ROOT.concat('login/')
export const LOGOUT = ROOT.concat('logout/')
export const TEAMMATES = ROOT.concat('/') //todo
export const STUDENT_WORKSHOPS = ROOT.concat('/') //todo
export const CURRENT_STATE = ROOT.concat('fsm/getcurrentState/')
export const CALL_MENTOR = ROOT.concat('fsm/requestmentor/')
export const GO_FORWARD = ROOT.concat('fsm/goforward/')
export const GO_BACKWARD = ROOT.concat('fsm/gobackward/')

export const UNREAD_NOTIFICATIONS = ROOT.concat('/') //todo
export const ALL_WORKSHOPS = ROOT.concat('fsm/fsm/')
export const WORKSHOP_TEAMS = ROOT.concat('fsm/workshopplayers/')
export const TEAM_ANSWERS = ROOT.concat('fsm/submittedanswers/')
export const VISIT_TEAM = ROOT.concat('fsm/visitteam/')

export const CREATE_WIDGET = ROOT.concat('fsm/widget/')