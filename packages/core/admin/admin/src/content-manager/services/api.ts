import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery, type UnknownApiError } from '../../utils/baseQuery';

const contentManagerApi = createApi({
  reducerPath: 'contentManagerApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Document', 'ContentTypesConfiguration'],
  endpoints: () => ({}),
});

export { contentManagerApi, type UnknownApiError };
