import { Film } from "@/generated/prisma";
import { chillApi } from "../services/api";
import { filmSchema } from "@/lib/zod";
import { z } from "zod";

const filmApi = chillApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilms: builder.query<{ data: PaginationDataType<Film> }, void>({
      query: () => ({
        url: "api/film",
        method: "GET",
      }),
    }),
    getFilmById: builder.query<{ data: Film }, string>({
      query: (id) => `api/film/${id}`,
    }),
    addFilm: builder.mutation<
      DefaultResponseType,
      { film: z.infer<typeof filmSchema> }
    >({
      query: ({ film }) => ({
        url: "api/film",
        method: "POST",
        body: film,
      }),
    }),
    updateFilm: builder.mutation<
      DefaultResponseType,
      { id: string; film: z.infer<typeof filmSchema> }
    >({
      query: ({ id, film }) => ({
        url: `api/film/${id}`,
        method: "PUT",
        body: film,
      }),
    }),
    deleteFilm: builder.mutation({
      query: (id) => ({
        url: `api/film/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const enFilmApi = filmApi.enhanceEndpoints({
  addTagTypes: ["Film"],
  endpoints: {
    getFilms: {
      providesTags: ["Film"],
    },
    getFilmById: {
      providesTags: ["Film"],
    },
    addFilm: {
      invalidatesTags: ["Film"],
    },
    updateFilm: {
      invalidatesTags: ["Film"],
    },
    deleteFilm: {
      invalidatesTags: ["Film"],
    },
  },
});

export const {
  useGetFilmsQuery,
  useGetFilmByIdQuery,
  useAddFilmMutation,
  useUpdateFilmMutation,
  useDeleteFilmMutation,
} = enFilmApi;
