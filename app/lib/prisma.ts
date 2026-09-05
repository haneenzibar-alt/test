import { PrismaClient } from "../../generated/prisma/client"; //the object that knows how to run queries against your database
import { PrismaPg } from "@prisma/adapter-pg"; // New in prisma 7(no longer connected to database), it requires you to explicitly provide a "driver adapter."

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL }); // creating adapter This creates a small object whose only job is to know how to open a real connection to your Postgres database

const globalForPrisma = globalThis as unknown as { //global cashing  pattern for prisma client, to avoid creating multiple instances of PrismaClient in development
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter }); // ??( "use the left side if it exists, otherwise use the right side)

if (process.env.NODE_ENV !== "production") { //This is what actually stores the client on the global object, but only in development.
  globalForPrisma.prisma = prisma;
}