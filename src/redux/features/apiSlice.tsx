import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: 'https://mps.sepid.org/api/',
  }),
  endpoints: build => ({
  })
})
