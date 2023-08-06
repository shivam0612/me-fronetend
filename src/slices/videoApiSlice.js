import { apiSlice } from './apiSlice';

const VIDEO_URL = '/api/video';

export const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (userId) => ({
        url: `${VIDEO_URL}/getVideo`,
        method: 'GET',
        params: { userId }, // Pass the userId as a query parameter
      }),
    }),
  }),
});

export const {
  useGetVideosQuery,
} = videoApiSlice;
