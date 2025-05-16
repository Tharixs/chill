/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { checkSession, formatApiResponse, handleError } from "@/lib/utils";
import { movieSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await checkSession(req, "ADMIN");
    if (session instanceof NextResponse) {
      return session;
    }
    const body = await req.json();
    const validatedData = movieSchema.parse(body);
    const movie = await prisma.movie.create({
      data: validatedData as any,
    });
    const response = formatApiResponse(movie);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
