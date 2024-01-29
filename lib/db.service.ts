import { PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient | undefined;
}
export namespace DatabaseService {
  export const dbInstance = globalThis?.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = dbInstance;
  }
}
