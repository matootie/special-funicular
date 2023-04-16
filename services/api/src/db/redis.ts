/**
 * Redis database client.
 */

// External imports.
import Redis from "ioredis"

// Utility imports.
import { config } from "#utils/config"

// The Redis client.
export const redis = new Redis(config.redis.url, {
  keyPrefix: "friends:",
})
