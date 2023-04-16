/**
 * Main application component.
 */

// External imports.
import { useNavigate, useParams } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"
import { Routes, Route } from "react-router-dom"

// Page imports.
import { Dashboard } from "#pages/dashboard"
import { MemberList } from "#pages/member-list"
import { MemberDetail } from "#pages/member-detail"

// Component imports.
import { Shell } from "#components/utility"

// Utility imports.
import { RequireAuth } from "#utils/auth"

export default function App() {
  const navigate = useNavigate()
  return (
    <Auth0Provider
      domain="discordfriends.us.auth0.com"
      clientId="h9rrT49sr95wF8M3gNkLc6wAHzGOuOrv"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "friends",
        connection: "discord",
        scope: "openid profile identify offline_access",
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={(state) => {
        navigate(state?.returnTo || window.location.pathname, { replace: true })
      }}
    >
      <RequireAuth>
        <Shell>
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/members"
              element={<MemberList />}
            />
            <Route
              path="/members/:memberId"
              element={<MemberDetail />}
            />
          </Routes>
        </Shell>
      </RequireAuth>
    </Auth0Provider>
  )
}
