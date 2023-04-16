/**
 * Non-member warning component.
 *
 * Displays when a logged in user is not a member of the Discord server.
 */

// External imports.
import { useAuth0 } from "@auth0/auth0-react"
import {
  ExclamationCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline"

/**
 * React component.
 */
export function NonMemberWarning() {
  const { logout } = useAuth0()
  return (
    <div className="min-w-full min-h-full flex flex-col justify-center items-center">
      <ExclamationCircleIcon className="w-16 h-16 text-blue-900" />
      <h1 className="text-blue-400 text-2xl font-semibold mt-4 mb-8">
        You are not a member of the Discord server.
      </h1>
      <button
        className="inline-flex items-center px-3 py-3 border border-transparent text-base font-medium rounded-2xl shadow-sm text-blue-300 bg-blue-900 hover:bg-blue-700 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
