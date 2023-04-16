/**
 * Main development entrypoint.
 */

// External imports.
import "dotenv/config"

// Utility imports.
import { logger } from "#utils/logger"

// Application imports.
import { app } from "#app"

// Serve the API.
app.listen(3001, () => {
  logger.info("Listening...")
})
