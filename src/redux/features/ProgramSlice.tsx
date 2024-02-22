import { ProgramType } from 'types/models';
import { mainBackendBaseApi } from './mainBackendApiSlice';

export const ProgramSlice = mainBackendBaseApi.injectEndpoints({
  endpoints: builder => ({
    getPrograms: builder.query<ProgramType[], string | undefined>({
      query: (partyUuid) => partyUuid ? `fsm/event/?party=${partyUuid}&is_private=False` : null,
      transformResponse: (respons: any): ProgramType[] => {
        return respons.results;
      },
    })
  })
});

export const { useGetProgramsQuery } = ProgramSlice;
