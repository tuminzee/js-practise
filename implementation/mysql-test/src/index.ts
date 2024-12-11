import {logger} from "@/logger";
import {connectDB} from "@/config/db";


async function main() {
  logger.info("Hello, world!");
  await connectDB();
}

main();