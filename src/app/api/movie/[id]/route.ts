/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { movieSchema } from "@/lib/zod";
import { checkSession, formatApiResponse, handleError } from "@/lib/utils";
import { buildApiQuery, parseQueryParams } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { filter, search, withParams } = parseQueryParams(req.url);

    const query = buildApiQuery({
      search,
      filter,
      with: withParams,
    });

    const movie = await prisma.movie.findUnique({
      where: { id: params.id },
      include: query.include,
    });
    const response = formatApiResponse(movie);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await checkSession(req, "ADMIN");
    if (session instanceof NextResponse) {
      return session;
    }
    const body = await req.json();
    const validatedData = movieSchema.partial().parse(body);
    const { id } = params;
    const movie = await prisma.movie.update({
      where: { id: id! },
      data: validatedData as any,
    });
    const response = formatApiResponse(
      movie,
      null,
      true,
      "movie updated successfully"
    );
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await checkSession(req, "ADMIN");
    if (session instanceof NextResponse) {
      return session;
    }
    const { id } = params;
    const movie = await prisma.movie.delete({
      where: { id: id! },
    });
    const response = formatApiResponse(
      movie,
      null,
      true,
      "movie deleted successfully"
    );
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
