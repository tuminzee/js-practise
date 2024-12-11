
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  DATABASE_URL: z.string(),
  POOL_SIZE: z.number().default(10),
});

type Env = z.infer<typeof envSchema>;

export const config: Env = envSchema.parse(process.env);
