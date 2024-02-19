import { PartyType } from 'types/global';
import { api } from './apiSlice'

export const PartyApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getParty: builder.query<PartyType, number>({
      query: (page) => `party-manager/get_party_by_domain/`,
    })
  })
})

export const { useGetPartyQuery } = PartyApiSlice;