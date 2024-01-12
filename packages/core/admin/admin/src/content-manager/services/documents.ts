/**
 * Related to fetching the actual content of a collection type or single type.
 */

import { contentManagerApi } from './api';

import type { Contracts } from '@strapi/plugin-content-manager/_internal/shared';

const documentApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    autoCloneDocument: builder.mutation<
      Contracts.CollectionTypes.Clone.Response['data'],
      Contracts.CollectionTypes.Clone.Params & { query?: string }
    >({
      query: ({ model, sourceId: id, query }) => ({
        url: `/content-manager/collection-types/${model}/auto-clone/${id}`,
        method: 'POST',
        config: {
          params: query,
        },
      }),
      transformResponse: (res: Contracts.CollectionTypes.Clone.Response) => res.data,
      invalidatesTags: (_result, _error, { model }) => [{ type: 'Document', id: `${model}_LIST` }],
    }),
    deleteDocument: builder.mutation<
      Contracts.CollectionTypes.Delete.Response['data'],
      Contracts.CollectionTypes.Delete.Params
    >({
      query: ({ model, id }) => ({
        url: `/content-manager/collection-types/${model}/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: Contracts.CollectionTypes.Delete.Response) => res.data,
      invalidatesTags: (_result, _error, { model, id }) => [
        { type: 'Document', id: `${model}_${id}` },
      ],
    }),
    deleteManyDocuments: builder.mutation<
      Contracts.CollectionTypes.BulkDelete.Response['data'],
      Contracts.CollectionTypes.BulkDelete.Params &
        Contracts.CollectionTypes.BulkDelete.Request['body']
    >({
      query: ({ model, ...body }) => ({
        url: `/content-manager/collection-types/${model}/bulkDelete`,
        method: 'POST',
        data: body,
      }),
      invalidatesTags: (_res, _error, { model, ids }) =>
        ids.map((id) => ({ type: 'Document', id: `${model}_${id}` })),
    }),
    /**
     * Gets all documents of a collection type or single type.
     * By passing different params you can get different results e.g. only published documents or es documents.
     */
    getAllDocuments: builder.query<
      Contracts.CollectionTypes.Find.Response,
      Contracts.CollectionTypes.Find.Params & Pick<Contracts.CollectionTypes.Find.Request, 'query'>
    >({
      query: (data) => ({
        url: `/content-manager/collection-types/${data.model}`,
        method: 'GET',
        config: {
          params: data.query,
        },
      }),
      providesTags: (result, _error, arg) => {
        return [
          { type: 'Document', id: `${arg.model}_LIST` },
          ...(result?.results.map(({ id }) => ({
            type: 'Document' as const,
            id: `${arg.model}_${id}`,
          })) ?? []),
        ];
      },
    }),
    unpublishManyDocuments: builder.mutation<
      Contracts.CollectionTypes.BulkUnpublish.Response['data'],
      Contracts.CollectionTypes.BulkUnpublish.Params &
        Contracts.CollectionTypes.BulkUnpublish.Request['body']
    >({
      query: ({ model, ...body }) => ({
        url: `/content-manager/collection-types/${model}/bulkUnpublish`,
        method: 'POST',
        data: body,
      }),
      invalidatesTags: (_res, _error, { model, ids }) =>
        ids.map((id) => ({ type: 'Document', id: `${model}_${id}` })),
    }),
  }),
});

const {
  useAutoCloneDocumentMutation,
  useDeleteDocumentMutation,
  useDeleteManyDocumentsMutation,
  useGetAllDocumentsQuery,
  useUnpublishManyDocumentsMutation,
} = documentApi;

export {
  useAutoCloneDocumentMutation,
  useDeleteDocumentMutation,
  useDeleteManyDocumentsMutation,
  useGetAllDocumentsQuery,
  useUnpublishManyDocumentsMutation,
};
