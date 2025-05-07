/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import {
  buildApiQuery,
  checkSession,
  formatApiResponse,
  handleError,
  parseQueryParams,
} from "@/lib/utils";
import { genreSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const { filter, page, limit, search, order_by, sorted_by, withParams } =
      parseQueryParams(req.url);

    const totalItems = await prisma.genre?.count();

    const paginationParams = { page, limit };

    const query = buildApiQuery({
      filter,
      search,
      order_by,
      sorted_by,
      pagination: paginationParams,
      with: withParams,
    });

    const genre = await prisma.genre.findMany(query as any);

    const pagination = {
      total: totalItems,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(totalItems / limit),
    };

    const response = formatApiResponse(genre, pagination);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await checkSession(req, "ADMIN");
    if (session instanceof NextResponse) {
      return session;
    }
    const body = await req.json();
    const validatedData = genreSchema.parse(body);
    const genre = await prisma.genre.create({
      data: validatedData as any,
    });
    const response = formatApiResponse(genre);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
