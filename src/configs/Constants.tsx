export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://backend.kamva.academy'
    : 'https://backend.kamva.academy'

export const PARSE_SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://parse.kamva.academy/server'
    : 'https://parse.kamva.academy/server';

export const LIVE_QUERY_SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'wss://parse.kamva.academy/ws'
    : 'wss://parse.kamva.academy/ws';

export const ITEMS_PER_PAGE_NUMBER = 12;

// show loading while sending file
// trello