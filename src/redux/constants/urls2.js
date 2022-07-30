// auth:
export const loginUrl = 'auth/accounts/login/';
export const logoutUrl = 'auth/accounts/logout/';
export const refreshTokenUrl = 'auth/accounts/refresh/';
export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ id }) =>
  id ? `auth/accounts/${id}/` : 'auth/accounts/';

export const profileCRUDUrl = ({ userId }) =>
  userId ? `auth/profile/${userId}/` : 'auth/profile/';
export const studentshipCRUDUrl = ({ userId }) =>
  userId ? `auth/studentship/${userId}/` : 'auth/studentship/';
export const discountCRUDUrl = ({ discountCodeId }) =>
  discountCodeId
    ? `auth/discount_code/${discountCodeId}/`
    : 'auth/discount_code/';
export const merchandiseDiscountCodeUrl = ({ merchandiseId }) =>
  `/auth/merchandise/${merchandiseId}/discount_codes/`;

// team:
export const getTeamsUrl = ({ registrationFormId }) => registrationFormId ? `/fsm/team/?registration_form=${registrationFormId}` : '/fsm/team/';
export const makeTeamHeadUrl = ({ teamId }) => `/fsm/team/${teamId}/make_team_head/`;
export const addUserToTeamUrl = ({ teamId }) => `fsm/team/${teamId}/register_and_join/`
export const createTeamUrl = 'fsm/team/';
export const addTeamsViaCSVUrl = ({ registrationFormId }) => `fsm/registration/${registrationFormId}/batch_register/`;

// event:
export const teamCRUDUrl = ({ teamId }) => teamId ? `fsm/team/${teamId}/` : 'fsm/team/';
export const getAllEventsInfoUrl = 'fsm/event/';
export const addMentorToWorkshopUrl = ({ fsmId }) => `/fsm/fsm/${fsmId}/add_mentor/`;
export const getMentoredFsmsUrl = ({ eventId }) => `/fsm/event/${eventId}/get_mentored_fsms/`;
export const getEventWorkshopsUrl = ({ eventId }) => `fsm/event/${eventId}/get_fsms/`;
export const registrationFormCRUDUrl = ({ registrationFormId }) => registrationFormId ? `fsm/registration/${registrationFormId}/` : 'fsm/registration/';


// workshop:
export const getFSMPlayersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/players/`;
export const getWorkshopsUrl = ({ eventId, pageNumber }) => {
  let url = '/fsm/fsm/';
  if (eventId) {
    url += `?event=${eventId}`;
  }
  if (pageNumber) {
    url += `&page=${pageNumber}`;
  }
  return url;
}
export const workshopCRUDUrl = ({ fsmId }) => fsmId ? `/fsm/fsm/${fsmId}/` : '/fsm/fsm/';
export const getAllWorkshopStatesInfoUrl = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_states/`;
export const getAllWorkshopEdges = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_edges/`;

// state:
export const stateCRUDUrl = ({ stateId }) => stateId ? `/fsm/state/${stateId}/` : '/fsm/state/';
export const edgeUrl = ({ edgeId }) => edgeId ? `/fsm/edge/${edgeId}/` : '/fsm/edge/';

// widget:
export const widgetCRUDUrl = ({ widgetId }) => widgetId ? `fsm/widget/${widgetId}/` : 'fsm/widget/';
export const statesCRUDUrl = ({ stateId }) => stateId ? `fsm/state/${stateId}/` : 'fsm/state/';

// fsm:
export const eventInfoUrl = ({ pageNumber, eventId }) => eventId ? `fsm/event/${eventId}/` : `fsm/event/?page=${pageNumber}`;
export const allRegistrationReceiptsUrl = ({ registrationFormId }) => `fsm/registration/${registrationFormId}/receipts/`;
export const oneRegistrationReceiptUrl = ({ registrationReceiptId }) => `fsm/receipts/${registrationReceiptId}/`;
export const validateRegistrationReceiptUrl = ({ registrationReceiptId }) => `/fsm/receipts/${registrationReceiptId}/validate/`;
export const getPlayerFromTeamUrl = ({ id }) => `/fsm/fsm/${id}/get_player_from_team/`;

export const getUnreadNotificationsUrl = 'notifications/api/unread_list/';

// articles
export const articlesUrl = ({ pageNumber, articleId }) => articleId ? `fsm/articles/${articleId}` : `fsm/articles/?page=${pageNumber}`;

export const helpUrl = 'fsm/help/';

export const workshopTeamsUrl = 'fsm/workshopplayers/';

export const goBackwardUrl = 'fsm/gobackward/';

export const goForwardUrl = 'fsm/goforward/';

export const participantGetCurrentStateUrl = 'fsm/getcurrentstate/';

export const mentorGetCurrentStateUrl = 'fsm/mentorgetplayerstate/';

export const visitWorkshopPlayerUrl = 'fsm/visitteam/';

export const sendAnswerUrl = 'fsm/sendanswer/';

export const startWorkshopUrl = 'fsm/startWorkshop/';

export const requestMentorUrl = 'fsm/requestmentor/';

export const getEventRegistrationInfoUrl = 'auth/registration-info/';

export const paymentRequestUrl = 'auth/pay/';

export const applyDiscountUrl = 'auth/verify-discount/';

export const getScoresUrl = 'fsm/getscores/';

export const getProblemsUrl = 'fsm/getproblems/';

export const getSubmissionsUrl = 'fsm/getsubmissions/';

export const markSubmissionUrl = 'fsm/marksubmission/';

export const getWorkshopsDescriptionUrl = 'fsm/getworkshopsdescription/';

// scoring:
export const answerCRUDUrl = ({ answerId }) => answerId ? `fsm/answers/${answerId}/` : 'fsm/answers/';
export const getAnswerScoresAndCommentsUrl = 'scoring/get_answer_scores_and_comments/';
export const setAnswerScoreUrl = 'scoring/set_answer_score/';
export const createCommentUrl = 'scoring/create_comment/';
