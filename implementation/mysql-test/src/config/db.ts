import { PrismaClient } from "@prisma/client";
import { logger } from "@/logger";

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ["query", "info", "warn", "error"]
    : [],
});

export async function connectDB() {
  try {
    await prisma.$connect();
    logger.info("Database connection established");
    return true;
  } catch (error) {
    logger.error(error, "Failed to connect to database:", );
    return false;
  }
}
