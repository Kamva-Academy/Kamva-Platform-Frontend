import { PartyType } from 'types/global';
import { ProgramType } from 'types/models';
import { mainBackendApi } from './mainBackendApiSlice';

export const ProgramSlice = mainBackendApi.injectEndpoints({
  endpoints: builder => ({
    getPrograms: builder.query<ProgramType[], string | undefined>({
      query: (partyUuid) => partyUuid ? `fsm/event/?party_uuid=${partyUuid}` : null,
    })
  })
})

export const { useGetProgramsQuery } = ProgramSlice;
