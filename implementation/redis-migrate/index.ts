import { createClient } from 'redis';
import * as dotenv from "dotenv";

dotenv.config();

const sourceUrl = process.env.SOURCE_REDIS_URL;
const targetUrl = process.env.TARGET_REDIS_URL;

if (!sourceUrl || !targetUrl) {
    throw new Error('SOURCE_REDIS_URL and TARGET_REDIS_URL must be set');
}

async function migrateRedisKeys(sourceUrl: string, targetUrl: string) {
    console.log(`Connecting to source Redis at ${sourceUrl}`);
    const sourceClient = createClient({ url: sourceUrl });
    console.log(`Connecting to target Redis at ${targetUrl}`);
    const targetClient = createClient({ url: targetUrl });

    await sourceClient.connect();
    await targetClient.connect();
    console.log('Connected to both Redis instances.');

    let cursor = 0;
    do {
        console.log(`Scanning keys with cursor: ${cursor}`);
        const result = await sourceClient.scan(cursor, { MATCH: 'user*' });
        cursor = Number(result.cursor);
        console.log(`Found ${result.keys.length} keys.`);

        for (const key of result.keys) {
            console.log(`Migrating key: ${key}`);
            const type = await sourceClient.type(key);
            console.log(`Type of key: ${key} is ${type}`);
            if (type == 'hash') {
              console.log(`Getting hash for key: ${key}`);
              const hashValue = await sourceClient.hGetAll(key);
              const targetHashValue = await targetClient.hGetAll(key);
              if (Object.keys(targetHashValue).length === 0) {
                console.log(`Restoring hash: ${key}`);
                await targetClient.hSet(key, hashValue);
              } else {
                console.log(`Hash already exists in target: ${key}`);
              }
            }
            if (type == 'zset') {
              console.log(`Getting sorted set for key: ${key}`);
              const sortedSetMembers = await sourceClient.zRangeWithScores(key, 0, -1);
              // check if this values is already present in target
              const targetSortedSetMembers = await targetClient.zRangeWithScores(key, 0, -1);
              if (targetSortedSetMembers.length === 0) {
                console.log(`Restoring sorted set: ${key}`);
                await targetClient.zAdd(key, sortedSetMembers);
              } else {
                console.log(`Sorted set already exists in target: ${key}`);
              }
            }
        }
    } while (cursor !== 0);

    console.log('Migration completed. Closing connections.');
    await sourceClient.quit();
    await targetClient.quit();
}


migrateRedisKeys(sourceUrl, targetUrl);

