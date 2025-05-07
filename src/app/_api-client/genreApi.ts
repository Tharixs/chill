import { Genre } from "@/generated/prisma";
import { chillApi } from "../services/api";

const genreApi = chillApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<PaginationResponse<Genre>, void>({
      query: () => "api/genre",
    }),
    getGenreById: builder.query<DefaultResponseType<Genre>, string>({
      query: (id) => `api/genre/${id}`,
    }),
    addGenre: builder.mutation({
      query: (genre) => ({
        url: "api/genre",
        method: "POST",
        body: genre,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, genre }) => ({
        url: `api/genre/${id}`,
        method: "PUT",
        body: genre,
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `api/genre/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const enGenreApi = genreApi.enhanceEndpoints({
  addTagTypes: ["Genre"],
  endpoints: {
    getGenres: {
      providesTags: ["Genre"],
    },
    getGenreById: {
      providesTags: ["Genre"],
    },
    addGenre: {
      invalidatesTags: ["Genre"],
    },
    updateGenre: {
      invalidatesTags: ["Genre"],
    },
    deleteGenre: {
      invalidatesTags: ["Genre"],
    },
  },
});

export const {
  useGetGenresQuery,
  useGetGenreByIdQuery,
  useAddGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = enGenreApi;
