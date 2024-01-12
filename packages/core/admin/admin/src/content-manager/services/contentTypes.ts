import { Contracts } from '@strapi/plugin-content-manager/_internal/shared';

import { contentManagerApi } from './api';

const contentTypesApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getContentTypeConfiguration: builder.query<
      Contracts.ContentTypes.FindContentTypeConfiguration.Response['data'],
      string
    >({
      query: (uid) => ({
        url: `/content-manager/content-types/${uid}/configuration`,
        method: 'GET',
      }),
      transformResponse: (response: Contracts.ContentTypes.FindContentTypeConfiguration.Response) =>
        response.data,
      providesTags: (_result, _error, uid) => [{ type: 'ContentTypesConfiguration', id: uid }],
    }),
  }),
});

const { useGetContentTypeConfigurationQuery } = contentTypesApi;

export { useGetContentTypeConfigurationQuery };
