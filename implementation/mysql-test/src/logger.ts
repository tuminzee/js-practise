import pino from "pino";
import { config } from "@/config/config";

export const logger = pino({
  transport: {
    target: config.NODE_ENV === 'development' ? 'pino-pretty': '',
  },
})
