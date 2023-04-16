/**
 * Main express application.
 */

// External imports.
import express from "express"

// Middleware imports.
import { auth } from "#middlewares/auth"
import { error } from "#middlewares/error"

// Route imports.
import { users } from "#routes/users"

// Utility imports.
import { NotFoundError } from "#utils/exceptions"

// The Express app.
export const app = express()

// Use JSON middleware.
app.use(express.json())

// Use auth middleware.
app.use(auth)

// Use routes.
app.use(users)

// Use 404 middleware.
app.use((_req, _res) => {
  throw new NotFoundError("The resource you have requested does not exist.")
})

// Use error middleware.
app.use(error)
