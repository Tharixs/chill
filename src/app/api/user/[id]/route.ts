/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/lib/zod";
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

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: query.include,
    });
    const response = formatApiResponse(user);
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
    const validatedData = userSchema.partial().parse(body);
    const { id } = params;
    const user = await prisma.user.update({
      where: { id: id! },
      data: validatedData as any,
    });
    const response = formatApiResponse(
      user,
      null,
      true,
      "user updated successfully"
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
    const user = await prisma.user.delete({
      where: { id: id! },
    });
    const response = formatApiResponse(
      user,
      null,
      true,
      "user deleted successfully"
    );
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(handleError(error), { status: 500 });
  }
}
