/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from "@reduxjs/toolkit/query/react";
import { buildBaseQuery } from "./config/query.config";
export const chillApi = createApi({
  baseQuery: buildBaseQuery(),
  endpoints: (builder) => ({}),
});
