/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import {
  buildApiQuery,
  checkSession,
  formatApiResponse,
  handleError,
  parseQueryParams,
} from "@/lib/utils";
import { filmSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const { filter, page, limit, search, order_by, sorted_by, withParams } =
      parseQueryParams(req.url);

    const totalItems = (await prisma.film?.count?.()) || 0;

    const paginationParams = { page, limit };

    const query = buildApiQuery({
      filter,
      search,
      order_by,
      sorted_by,
      pagination: paginationParams,
      with: withParams,
    });

    const film = await prisma.film.findMany(query as any);

    const pagination = {
      total: totalItems,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(totalItems / limit),
    };

    const response = formatApiResponse(film, pagination);
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
    const validatedData = filmSchema.parse(body);
    const film = await prisma.film.create({
      data: validatedData as any,
    });
    const response = formatApiResponse(film);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
