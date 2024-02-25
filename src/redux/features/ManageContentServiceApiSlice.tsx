import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from 'configs/Constants'


export const ManageContentServiceApi = createApi({
  reducerPath: 'manage-content-service',
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: BACKEND_URL + 'api/',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const accessToken = (getState() as any).account?.token;
      //todo: what should we do with refresh token?!
      const refreshToken = (getState() as any).account?.refresh;
      if (accessToken) {
        headers.append('Authorization', `JWT ${accessToken}`)
      }
      return headers
    },
  }),
  endpoints: build => ({
  })
})
