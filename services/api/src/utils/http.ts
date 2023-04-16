/**
 * HTTP utilities.
 */

// External imports.
import axiosBase from "axios"

// Utility imports.
import { config } from "#utils/config"

// Axios base object.
export const discord = axiosBase.create({
  baseURL: `https://discord.com/api/guilds/${config.discord.server}`,
  headers: {
    Authorization: `Bot ${config.discord.token}`,
    "Content-Type": "application/json",
  },
  validateStatus: null,
})
