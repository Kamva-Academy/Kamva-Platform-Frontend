export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://kamva-backend.darkube.app'
    : 'http://localhost:8000'

export const ITEMS_PER_PAGE_NUMBER = 12;