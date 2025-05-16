/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import {
  buildApiQuery,
  formatApiResponse,
  handleError,
  parseQueryParams,
} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { filter, page, limit, search, order_by, sorted_by, withParams } =
      parseQueryParams(req.url);

    const totalItems = await prisma.movie?.count();

    const paginationParams = { page, limit };

    const query = buildApiQuery({
      filter,
      search,
      order_by,
      sorted_by,
      pagination: paginationParams,
      with: withParams,
    });

    const movies = await prisma.movie.findMany(query as any);

    const pagination = {
      total: totalItems,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(totalItems / limit),
    };

    const response = formatApiResponse(movies, pagination);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
