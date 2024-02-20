import { ProgramType } from 'types/models';
import { mainBackendBaseApi } from './mainBackendApiSlice';

export const ProgramSlice = mainBackendBaseApi.injectEndpoints({
  endpoints: builder => ({
    getPrograms: builder.query<ProgramType[], string | undefined>({
      query: (partyUuid) => partyUuid ? `fsm/event/?party_uuid=${partyUuid}` : null,
    })
  })
})

export const { useGetProgramsQuery } = ProgramSlice;
