import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@configs';

export const neucentrixApi = createApi({
  reducerPath: 'neucentrixApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getOptionsData: builder.query({
      query: ({ categoryName }) =>
        `/activation/internal/purchase-order/cndc/category/${categoryName}`,
    }),
  }),
});

export const { useGetOptionsDataQuery } = neucentrixApi;
