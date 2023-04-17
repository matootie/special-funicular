/**
 * Application entrypoint.
 */

// External imports.
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

// Application imports.
import App from "#app"

// Style imports.
import "#styles"

// Font imports.
import "#assets/fonts.css"

// Get the document root.
const root = document.getElementById("root")
if (!root) throw new Error("Missing root")

// Render the application.
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
)
