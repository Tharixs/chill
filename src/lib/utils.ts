/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkSession(
  req: NextRequest,
  type: "USER" | "ADMIN" | "ALL" = "ALL"
) {
  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: "next-auth.session-token",
    secureCookie: true,
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Token is missing.", token: null },
      { status: 401 }
    );
  }

  if (type === "ADMIN" && session.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized. role User is not admin.", token: null },
      { status: 401 }
    );
  }

  if (type === "USER" && session.role !== "USER") {
    return NextResponse.json(
      { error: "Unauthorized. role User is not user.", token: null },
      { status: 401 }
    );
  }

  if (type === "ALL" && session.role !== "USER" && session.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized. role User is not admin or user.", token: null },
      { status: 401 }
    );
  }

  return session;
}

export const formatApiResponse = (
  data: any,
  pagination?: any | null,
  success?: boolean | null,
  message?: string | null
) => {
  const isArray = Array.isArray(data);

  // Format response based on whether the data is an array or not
  const response = isArray
    ? {
        success: success || true,
        message: message || "Success Fetching Data",
        data: { items: data, pagination: pagination },
      }
    : {
        success: success || true,
        message: message || "Success Fetching Data",
        data: data,
      };

  return response;
};

export function handleError(error: Error) {
  return {
    error: "Failed to fetch data",
    message: error.message,
    details: error,
  };
}

export function parseQueryParams(reqUrl: string) {
  const { searchParams } = new URL(reqUrl);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const filter = searchParams.get("filter")
    ? JSON.parse(searchParams.get("filter") as string)
    : undefined;

  const search = searchParams.get("search") || undefined;
  const order_by = searchParams.get("order_by") || undefined;
  const sorted_by = (searchParams.get("sorted_by") as "asc" | "desc") || "asc";

  const withParams = searchParams.get("with") || undefined;

  return {
    page,
    limit,
    filter,
    search,
    order_by,
    sorted_by,
    withParams,
  };
}

type ApiParams = {
  filter?: Record<string, any>;
  search?: string;
  order_by?: string;
  sorted_by?: "asc" | "desc";
  pagination?: {
    page: number;
    limit: number;
  };
  with?: string;
};

export function buildApiQuery(params: ApiParams): Record<string, any> {
  const {
    filter,
    search,
    order_by,
    sorted_by,
    pagination,
    with: withParams,
  } = params;

  const query: Record<string, any> = {};

  if (search) {
    query.where = query.where || {};
    query.where.OR = query.where.OR || [];

    const searchFields = search.split(":");

    // Jika search memiliki format relasi.field:value
    if (searchFields.length === 2) {
      const [relationField, value] = searchFields;
      const [relation, field] = relationField.split(".");

      if (relation && field && value) {
        // Handle relasi (misal: user.nama)
        query.where.OR.push({
          [relation]: {
            [field]: { contains: value.replace(/"/g, "") }, // Tanpa mode: "insensitive"
          },
        });
      } else if (relationField && value) {
        // Handle field langsung (misal: resume:"...")
        query.where.OR.push({
          [relationField]: { contains: value.replace(/"/g, "") }, // Tanpa mode: "insensitive"
        });
      }
    } else {
      // Jika search hanya memiliki format field:value
      query.where.OR.push({
        nama: {
          contains: search.replace(/"/g, ""), // Pencarian default pada nama
        },
      });
      query.where.OR.push({
        deskripsi: {
          contains: search.replace(/"/g, ""), // Pencarian default pada deskripsi
        },
      });
    }
  }

  if (filter) {
    query.where = query.where || {};

    const setNestedFilter = (target: any, path: string, value: any) => {
      const keys = path.split(".");
      let current = target;

      keys.forEach((key, index) => {
        if (!current[key]) {
          current[key] = index === keys.length - 1 ? value : {};
        }
        current = current[key];
      });
    };

    Object.entries(filter).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          setNestedFilter(query.where, `${key}.${nestedKey}`, nestedValue);
        });
      } else if (Array.isArray(value)) {
        setNestedFilter(query.where, key, {
          in: value,
        });
      } else {
        // Simple filter
        setNestedFilter(query.where, key, value);
      }
    });
  }

  query.where = query.where || {};

  // Handle ordering
  if (order_by) {
    query.orderBy = { [order_by]: sorted_by || "asc" };
  }

  // Handle pagination
  if (pagination && pagination.page && pagination.limit) {
    query.skip = (pagination.page - 1) * pagination.limit;
    query.take = pagination.limit;
  }

  if (withParams && withParams.length > 0) {
    query.include = {};

    withParams.split(",").forEach((relation) => {
      const parts = relation.split(".");
      let currentLevel = query.include;

      parts.forEach((part, index) => {
        const singularPart = part.endsWith("s") ? part.slice(0, -1) : part;

        if (!currentLevel[singularPart]) {
          currentLevel[singularPart] = {};
        }

        if (index === parts.length - 1) {
          currentLevel[singularPart] = {
            include: {},
          };
        } else {
          if (!currentLevel[singularPart].include) {
            currentLevel[singularPart].include = {};
          }
          currentLevel = currentLevel[singularPart].include;
        }
      });
    });
  }

  query.where = {
    ...query.where,
  };

  return query;
}
