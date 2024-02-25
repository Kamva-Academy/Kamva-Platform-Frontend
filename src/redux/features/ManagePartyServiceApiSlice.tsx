import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const ManagePartyServiceApi = createApi({
  reducerPath: 'mangage-party-service',
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: 'https://mps.sepid.org/api/',
  }),
  endpoints: build => ({
  })
})
