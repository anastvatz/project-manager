import { apiSlice } from './apiSlice';
const PROJECTS_URL = '/api/project';

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newp: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/new`,
        method: 'POST',
        body: data,
      }),
    }),
    getp: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}`,
        method: 'GET',
        body: data,
      }),
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/delete`,
        method: 'DELETE',
        body: data,
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/update`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useNewpMutation,
  useGetpMutation,
  useUpdateMutation,
  useDeleteMutation
} = projectsApiSlice;
