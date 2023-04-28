/**
 * Preferences routes.
 */

// External imports.
import express from "express"

// Middleware imports.
import { member } from "#middlewares/member"

// Utility imports.
import { NotImplementedError } from "#utils/exceptions"
import { logger } from "#utils/logger"

// The router.
export const preferences = express.Router()

/**
 * Get current role preferences.
 */
preferences.get("/preferences/role", member, async (_req, res) => {
  res.status(200).send({
    color: "#FA8B34",
    roleName: "Hello, world!",
  })
})

/**
 * Update role preferences.
 */
preferences.put("/preferences/role", member, async (req, _res) => {
  logger.debug(req.body)
  throw new NotImplementedError(
    "The ability to set role customizations has not yet been implemented."
  )
})
