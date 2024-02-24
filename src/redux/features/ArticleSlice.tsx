import { ProgramType } from 'types/models';
import { mainBackendBaseApi } from './mainBackendApiSlice';
import { ArticleType } from 'types/redux/article';

export const ArticleSlice = mainBackendBaseApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<ArticleType[], { partyUuid: string, pageNumber: number }>({
      query: ({ partyUuid, pageNumber }) => partyUuid ? `fsm/article/?party=${partyUuid}&page=${pageNumber}&is_private=False` : null,
      transformResponse: (respons: any): ArticleType[] => {
        return respons.results;
      },
    })
  })
});

export const { useGetArticlesQuery } = ArticleSlice;
