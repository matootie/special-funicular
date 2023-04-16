/**
 * Utility to wrap general config variables.
 */

// Fail when crucial variables are missing.
if (!process.env.DISCORD_TOKEN) {
  throw new Error("Missing environment variable 'DISCORD_TOKEN' in config.")
}

// Export the config.
export const config = {
  redis: {
    url: process.env.REDIS_URL || "redis://localhost",
  },
  discord: {
    token: process.env.DISCORD_TOKEN,
    server: process.env.SERVER_ID || "907723403639808030",
  },
  auth: {
    expectedIssuer: "https://discordfriends.us.auth0.com/",
    expectedAudience: "friends",
  },
}
