export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/';

export const PARSE_SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://parse.kamva.academy/server/'
    : 'https://parse.kamva.academy/server/';

export const LIVE_QUERY_SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'wss://parse.kamva.academy/ws/'
    : 'wss://parse.kamva.academy/ws/';

export const ITEMS_PER_PAGE_NUMBER = 12;
