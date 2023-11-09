// account
export const loginUrl = 'auth/accounts/login/';
export const logoutUrl = 'auth/accounts/logout/';
export const refreshTokenUrl = 'auth/accounts/refresh/';
export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ id }) => id ? `auth/accounts/${id}/` : 'auth/accounts/';

export const profileCRUDUrl = ({ id }) => id ? `auth/profile/${id}/` : 'auth/profile/';

export const studentShipUrl = 'auth/studentship/';
export const studentshipCRUDUrl = ({ id }) => `auth/studentship/${id}/`;

export const institutesUrl = ({ cityTitle }) => cityTitle ? `auth/institutes?city=${cityTitle}` : 'auth/institutes/';

// payment
export const getAllUserMerchandisesUrl = ({ id }) => `auth/payment/${id}/`;
export const purchaseEventUrl = 'auth/payment/purchase/';
export const submitDiscountCodeUrl = 'auth/payment/verify_discount/';

// workshop
export const getOneWorkshopUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/`;
export const getWorkshopsUrl = ({ programId, pageNumber }) => {
  let url = 'fsm/fsm/';
  if (programId) {
    url += `?event=${programId}`;
  }
  if (pageNumber) {
    url += `&page=${pageNumber}`;
  }
  return url;
}
export const getRegistrableWorkshopsUrl = 'fsm/fsm/?registrable=true';
export const reviewAnswersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/review/`;

export const getAllEventsInfoUrl = 'fsm/event/';
export const getOneEventInfoUrl = ({ programId }) => `fsm/event/${programId}/`;
export const getOneRegistrationFormUrl = ({ id }) => `fsm/registration/${id}/`;
export const submitRegistrationFormUrl = ({ id }) =>
  `fsm/registration/${id}/register/`;
export const registrationReceiptUrl = ({ registrationReceiptId }) => `fsm/receipts/${registrationReceiptId}/`;
export const uploadFileUrl = 'fsm/upload_answer/';
export const getTeamUrl = ({ teamId }) => `fsm/team/${teamId}/`;
export const getTeamInvitationsUrl = ({ teamId }) =>
  `/fsm/team/${teamId}/get_team_invitations/`;

export const getMyInvitationsUrl = ({ registrationFormId }) =>
  `fsm/registration/${registrationFormId}/my_invitations/`;

export const inviteSomeoneUrl = ({ teamId }) =>
  `fsm/team/${teamId}/invite_member/`;
export const deleteInvitationUrl = ({ invitationId }) =>
  `fsm/invitations/${invitationId}/`;
export const respondInvitationUrl = ({ invitationId }) =>
  `fsm/invitations/${invitationId}/respond/`;

export const TeamCRUDUrl = ({ teamId }) =>
  teamId ? `fsm/team/${teamId}/` : 'fsm/team/';

export const createTeamAndJoinActionUrl = 'fsm/team/create_team_and_join/';


export const articlesUrl = ({ pageNumber, articleId }) => articleId ? `fsm/articles/${articleId}` : `fsm/articles/?page=${pageNumber}`;

export const statesUrl = 'fsm/state/';

/////////// HINT ///////////
// TOFF
export const hintUrl = ({ hintId }) => hintId ? `fsm/hint/${hintId}/` : 'fsm/hint/';
export const widgetHintUrl = ({ hintId }) => hintId ? `fsm/widget-hint/${hintId}/` : 'fsm/widget-hint/';




export const goBackwardUrl = ({ id }) => `fsm/player/${id}/go_backward/`;

export const goForwardUrl = ({ id }) => `fsm/edge/${id}/go_forward/`;

export const mentorMoveBackwardUrl = ({ id }) =>
  `fsm/player/${id}/mentor_move_backward/`;

export const mentorMoveForwardUrl = ({ id }) =>
  `fsm/edge/${id}/mentor_move_forward/`;


export const mentorGetCurrentStateUrl = ({ id }) => `fsm/player/${id}/`;


export const enterWorkshopUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/enter/`;

export const requestMentorUrl = 'fsm/requestmentor/';

export const getEventRegistrationInfoUrl = 'auth/registration-info/';

export const paymentRequestUrl = 'auth/pay/';


// landing
export const getLandingDataUrl = '?';

//event
export const getCertificateUrl = ({ registrationReceiptId }) => `/fsm/receipts/${registrationReceiptId}/get_certificate/`;
export const applyDiscountUrl = 'auth/verify-discount/';

export const getScoresUrl = 'fsm/getscores/';



// for mentors

// auth:
export const discountCRUDUrl = ({ discountCodeId }) =>
  discountCodeId
    ? `auth/discount_code/${discountCodeId}/`
    : 'auth/discount_code/';
export const merchandiseDiscountCodeUrl = ({ merchandiseId }) =>
  `/auth/merchandise/${merchandiseId}/discount_codes/`;

// team:
export const getTeamsUrl = ({ registrationFormId }) => registrationFormId ? `/fsm/team/?registration_form=${registrationFormId}` : '/fsm/team/';
export const makeTeamHeadUrl = ({ teamId }) => `/fsm/team/${teamId}/make_team_head/`;
export const removeFromTeamUrl = '/fsm/team/remove_from_team/';
export const addUserToTeamUrl = ({ teamId }) => `fsm/team/${teamId}/register_and_join/`
export const createTeamUrl = 'fsm/team/';
export const registerUsersViaCSVUrl = ({ registrationFormId }) => `fsm/registration_form_admin/${registrationFormId}/register_participants_via_list/`;
export const registerOneUserUrl = ({ registrationFormId }) => `fsm/registration_form_admin/${registrationFormId}/register_individual_participant/`;

// event:
export const teamCRUDUrl = ({ teamId }) => teamId ? `fsm/team/${teamId}/` : 'fsm/team/';
export const addMentorToWorkshopUrl = ({ fsmId }) => `/fsm/fsm/${fsmId}/add_mentor/`;
export const getMentoredFsmsUrl = ({ programId }) => `/fsm/event/${programId}/get_mentored_fsms/`;
export const registrationFormCRUDUrl = ({ registrationFormId }) => registrationFormId ? `fsm/registration/${registrationFormId}/` : 'fsm/registration/';


// workshop:
export const getFSMPlayersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/players/`;
export const workshopCRUDUrl = ({ fsmId }) => fsmId ? `/fsm/fsm/${fsmId}/` : '/fsm/fsm/';
export const getAllWorkshopStatesInfoUrl = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_states/`;
export const getAllWorkshopEdges = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_edges/`;
export const getAllWorkshopMentors = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_mentors/`;
export const removeMentorURL = ({ fsmId }) => `/fsm/fsm/${fsmId}/remove_mentor/`;

// state:
export const stateCRUDUrl = ({ paperId }) => paperId ? `/fsm/state/${paperId}/` : '/fsm/state/';
export const edgeUrl = ({ edgeId }) => edgeId ? `/fsm/edge/${edgeId}/` : '/fsm/edge/';

// fsm:
export const eventInfoUrl = ({ pageNumber, programId }) => programId ? `fsm/event/${programId}/` : `fsm/event/?page=${pageNumber}`;
export const allRegistrationReceiptsUrl = ({ registrationFormId, pageNumber }) => `fsm/registration/${registrationFormId}/receipts/?page=${pageNumber}`;
export const validateRegistrationReceiptUrl = ({ registrationReceiptId }) => `/fsm/receipts/${registrationReceiptId}/validate/`;
export const getPlayerFromTeamUrl = ({ id }) => `/fsm/fsm/${id}/get_player_from_team/`;

// articles

export const participantGetCurrentStateUrl = 'fsm/getcurrentstate/';

export const sendAnswerUrl = 'fsm/sendanswer/';

export const startWorkshopUrl = 'fsm/startWorkshop/';

export const getWorkshopsDescriptionUrl = 'fsm/getworkshopsdescription/';

// scoring:
export const answerCRUDUrl = ({ answerId }) => answerId ? `fsm/answers/${answerId}/` : 'fsm/answers/';
export const getAnswerScoresAndCommentsUrl = 'scoring/get_answer_scores_and_comments/';
export const setAnswerScoreUrl = 'scoring/set_answer_score/';
export const createCommentUrl = 'scoring/create_comment/';

// question
export const checkUsernameUrl = 'question/check_username/';

// widget
export const sendWidgetAnswerUrl = ({ widgetId }) => `/fsm/widget/${widgetId}/submit_answer/`;
export const makeAnswerEmptyUrl = ({ widgetId }) => `/fsm/widget/${widgetId}/make_empty/`;
export const getProblemsUrl = 'fsm/getproblems/';
export const getUnreadNotificationsUrl = 'notifications/api/unread_list/';
export const markSubmissionUrl = 'fsm/marksubmission/';
export const makeWidgetFileEmptyUrl = ({ widgetId }) => `fsm/widget/${widgetId}/make_widget_file_empty/`;
export const widgetCRUDUrl = ({ widgetId }) => widgetId ? `fsm/widget/${widgetId}/` : 'fsm/widget/';
export const statesCRUDUrl = ({ paperId }) => paperId ? `fsm/state/${paperId}/` : 'fsm/state/';
export const visitWorkshopPlayerUrl = 'fsm/visitteam/';
export const workshopTeamsUrl = 'fsm/workshopplayers/';

// Website Appearance

export const bannersCRUDUrl = 'websiteappearance/banner/';

// Roadmap

export const roadmapCRUDUrl = 'roadmap/';