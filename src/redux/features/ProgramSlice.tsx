import { ProgramType } from 'types/models';
import { mainBackendBaseApi } from './mainBackendApiSlice';

export const ProgramSlice = mainBackendBaseApi.injectEndpoints({
  endpoints: builder => ({
    getPrograms: builder.query<ProgramType[], { partyUuid: string | undefined, pageNumber?: number }>({
      query: ({ partyUuid, pageNumber = 1 }) => partyUuid ? `fsm/event/?party=${partyUuid}&page=${pageNumber}&is_private=False` : null,
      transformResponse: (respons: any): ProgramType[] => {
        return respons.results;
      },
    })
  })
});

export const { useGetProgramsQuery } = ProgramSlice;
