type PrismaMiddlewareParams = {
  model?: string;
  action: string;
  args: {
    where?: Record<string, unknown>;
    data?: Record<string, unknown>;
    force?: boolean;
  };
  dataPath: string[];
  runInTransaction: boolean;
};

type PrismaMiddlewareNext = (
  params: PrismaMiddlewareParams
) => Promise<unknown>;

export const softDeleteMiddleware = async (
  params: PrismaMiddlewareParams,
  next: PrismaMiddlewareNext
) => {
  // Tangani query Find
  if (params.action === "findUnique" || params.action === "findFirst") {
    // Tambahkan kondisi untuk filter data yang tidak dihapus
    params.args.where = {
      ...params.args.where,
      deleted_at: null,
    };
  }

  if (params.action === "findMany") {
    // Filter semua data yang tidak dihapus
    if (!params.args.where) {
      params.args.where = {};
    }
    params.args.where.deleted_at = null;
  }

  // Tangani query Delete
  if (params.action === "delete") {
    const forceDelete = params.args.force || false;
    delete params.args.force;

    if (!forceDelete) {
      params.action = "update";
      params.args.data = { deleted_at: new Date() };
    }
  }

  // Tangani query DeleteMany
  if (params.action === "deleteMany") {
    params.action = "updateMany";
    if (!params.args.data) {
      params.args.data = {};
    }
    params.args.data.deleted_at = new Date();
  }

  return next(params);
};
