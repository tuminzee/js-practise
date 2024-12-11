import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "@/logger";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const RECORDS_COUNT = 100;


async function main() {
  const filename = path.basename(__filename);
  logger.info(
    `Running ${filename} script in env: ${process.env.NODE_ENV}, node version: ${process.version}`
  );
  await seed();
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});

async function seed() {
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await addUsers(tx);
    await addPosts(tx);
    await addPostCounts(tx);
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await updateFewUsers(prisma);
}

async function updateFewUsers(tx: Prisma.TransactionClient) {
  await tx.user.updateMany({
    where: { id: { in: [1, 2, 3] } },
    data: { name: "John Doe" },
  });
}

async function addPostCounts(tx: Prisma.TransactionClient) {
  const users = await tx.user.findMany({
    include: {
      posts: true
    }
  });
  for (const user of users) {
    await tx.user.update({ where: { id: user.id }, data: { postCount: user.posts.length } });
  }
}

async function addUsers(tx: Prisma.TransactionClient) {
  for (let i = 0; i < RECORDS_COUNT; i++) {
    await tx.user.upsert({
      where: { id: i + 1 },
      update: { name: faker.person.fullName() },
      create: { name: faker.person.fullName() },
    });
  }
}

async function addPosts(tx: Prisma.TransactionClient) {
  for (let i = 0; i < RECORDS_COUNT; i++) {
    await tx.post.upsert({
      where: { id: i + 1 },
      update: { title: faker.lorem.sentence() },
      create: {
        title: faker.lorem.sentence(),
        authorId: faker.number.int({ min: 1, max: RECORDS_COUNT }),
      },
    });
  }
}
