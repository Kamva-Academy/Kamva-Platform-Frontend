import * as actionTypes from '../actions/actionTypes';

const initState = {
  workshops: [],
  articles: [],
  teams: {},
  notifications: [],
};

function mentor(state = initState, action) {
  switch (action.type) {
    case actionTypes.ALL_WORKSHOPS_REQUEST:
      return {
        ...state,
        getWorkshopsLoading: true,
      };
    case actionTypes.ALL_WORKSHOPS_SUCCESS:
      return {
        ...state,
        workshops: action.response,
        getWorkshopsLoading: false,
      };
    case actionTypes.ALL_WORKSHOPS_FAILURE:
      return {
        ...state,
        getWorkshopsLoading: false,
      };

    case actionTypes.GET_WORKSHOP_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const newWorkshops = state.workshops.filter(
        (workshop) => +workshop.id !== +action.response.id
      );
      newWorkshops.push(action.response);
      return {
        ...state,
        workshops: newWorkshops,
      };

    case actionTypes.ALL_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.response,
      };

    case actionTypes.GET_ARTICLE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const newArticles = state.articles.filter(
        (article) => +article.id !== +action.response.id
      );
      newArticles.push(action.response);
      return {
        ...state,
        articles: newArticles,
      };

    case actionTypes.CREATE_STATE_SUCCESS:
      return {
        ...state,
        workshops: state.workshops.map((workshop) =>
          workshop.id === action.payload.fsmId
            ? { ...workshop, states: [...workshop.states, action.response] }
            : workshop
        ),
      };

    case actionTypes.WORKSHOP_TEAMS_SUCCESS:
      return {
        ...state,
        teams: {
          ...state.teams,
          [action.payload.fsmId]: action.response,
        },
      };

    case actionTypes.UNREAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.response.unread_list.map(
          (unread) => +unread.actor_object_id
        ),
      };

    case actionTypes.VISIT_PLAYER_WORKSHOP_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification !== action.payload.playerWorkshopId
        ),
      };

    default:
      return state;
  }
}

export default mentor;
