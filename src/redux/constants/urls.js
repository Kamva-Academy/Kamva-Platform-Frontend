// account
export const loginUrl = 'auth/accounts/login/';
export const logoutUrl = 'auth/accounts/logout/';
export const refreshTokenUrl = 'auth/accounts/refresh/';
export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ id }) =>
  id ? `auth/accounts/${id}/` : 'auth/accounts/';

export const profileCRUDUrl = ({ id }) => id ? `auth/profile/${id}/` : 'auth/profile/';

export const studentShipUrl = 'auth/studentship/';
export const studentshipCRUDUrl = ({ id }) => `auth/studentship/${id}/`;

export const institutesUrl = ({ cityTitle }) => cityTitle ? `auth/institutes?city=${cityTitle}` : 'auth/institutes/';

// payment
export const getAllUserMerchandisesUrl = ({ id }) => `auth/payment/${id}/`;
export const purchaseEventUrl = 'auth/payment/purchase/';
export const submitDiscountCodeUrl = 'auth/payment/verify_discount/';

// workshop
export const getOneWorkshopUrl = ({ workshopId }) => `fsm/fsm/${workshopId}/`;
export const getWorkshopsUrl = ({ eventId, pageNumber }) => {
  let url = 'fsm/fsm/';
  if (eventId) {
    url += `?event=${eventId}`;
  }
  if (pageNumber) {
    url += `&page=${pageNumber}`;
  }
  return url;
}
export const getRegistrableWorkshopsUrl = 'fsm/fsm/?registrable=true';
export const reviewAnswersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/review/`;




export const getAllEventsInfoUrl = 'fsm/event/';
export const getOneEventInfoUrl = ({ eventId }) => `fsm/event/${eventId}/`;
export const getOneRegistrationFormUrl = ({ id }) => `fsm/registration/${id}/`;
export const submitRegistrationFormUrl = ({ id }) =>
  `fsm/registration/${id}/register/`;
export const registrationReceiptUrl = ({ id }) => `fsm/receipts/${id}/`;
export const uploadFileUrl = 'fsm/upload_answer/';
export const getTeamUrl = ({ teamId }) => `fsm/team/${teamId}/`;
export const getTeamInvitationsUrl = ({ teamId }) =>
  `/fsm/team/${teamId}/get_invitations/`;
export const getMyInvitationsUrl = ({ registrationReceiptId }) =>
  `fsm/registration/${registrationReceiptId}/my_invitations/`;
export const inviteSomeoneUrl = ({ teamId }) =>
  `fsm/team/${teamId}/invite_member/`;
export const deleteInvitationUrl = ({ invitationId }) =>
  `fsm/invitations/${invitationId}/`;
export const respondInvitationUrl = ({ invitationId }) =>
  `fsm/invitations/${invitationId}/respond/`;
export const TeamCRUDUrl = ({ teamId }) =>
  teamId ? `fsm/team/${teamId}/` : 'fsm/team/';


export const getUnreadNotificationsUrl = 'notifications/api/unread_list/';

export const articlesUrl = ({ pageNumber, articleId }) => articleId ? `fsm/articles/${articleId}` : `fsm/articles/?page=${pageNumber}`;

export const statesUrl = 'fsm/state/';

export const helpUrl = 'fsm/help/';

export const widgetUrl = 'fsm/widget/';

export const workshopTeamsUrl = 'fsm/workshopplayers/';

export const getLandingDataUrl = `https://res.cloudinary.com/dflcxtpro/raw/upload/v${Math.floor(
  Math.random() * 10000000
)}/rasta/landing-zero-v3_d5lbgq.json/`;

export const goBackwardUrl = ({ id }) => `fsm/edge/${id}/go_backward/`;

export const goForwardUrl = ({ id }) => `fsm/edge/${id}/go_forward/`;

export const mentorMoveBackwardUrl = ({ id }) =>
  `fsm/edge/${id}/mentor_move_backward/`;

export const mentorMoveForwardUrl = ({ id }) =>
  `fsm/edge/${id}/mentor_move_forward/`;


export const mentorGetCurrentStateUrl = ({ id }) => `fsm/player/${id}/`;

export const visitWorkshopPlayerUrl = 'fsm/visitteam/';

export const enterWorkshopUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/enter/`;

export const requestMentorUrl = 'fsm/requestmentor/';

export const getEventRegistrationInfoUrl = 'auth/registration-info/';

export const paymentRequestUrl = 'auth/pay/';

// widget
export const sendWidgetAnswerUrl = ({ widgetId }) => `/fsm/widget/${widgetId}/submit_answer/`;
export const makeAnswerEmptyUrl = ({ widgetId }) => `/fsm/widget/${widgetId}/make_empty/`;

export const widgetCRUDUrl = ({ widgetId }) => widgetId ? `fsm/widget/${widgetId}/` : 'fsm/widget/';


//event
export const getCertificateUrl = ({ registrationReceiptId }) => `/fsm/receipts/${registrationReceiptId}/get_certificate/`;
export const applyDiscountUrl = 'auth/verify-discount/';

export const getScoresUrl = 'fsm/getscores/';

export const getProblemsUrl = 'fsm/getproblems/';

export const getSubmissionsUrl = 'fsm/getsubmissions/';

export const markSubmissionUrl = 'fsm/marksubmission/';
