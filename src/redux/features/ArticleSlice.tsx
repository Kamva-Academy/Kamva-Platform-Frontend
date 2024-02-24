import { ProgramType } from 'types/models';
import { mainBackendBaseApi } from './mainBackendApiSlice';
import { ArticleType } from 'types/redux/article';

type GetArticlesInputType = {
  partyUuid: string;
  pageNumber: number;
}

type GetArticlesOutputType = {
  count: number;
  articles: ArticleType[];
}

export const ArticleSlice = mainBackendBaseApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<GetArticlesOutputType, GetArticlesInputType>({
      query: ({ partyUuid, pageNumber }) => partyUuid ? `fsm/article/?party=${partyUuid}&page=${pageNumber}&is_private=False` : null,
      transformResponse: (respons: any): GetArticlesOutputType => {
        return {
          count: respons.count,
          articles: respons.results,
        }
      },
    })
  })
});

export const { useGetArticlesQuery } = ArticleSlice;
