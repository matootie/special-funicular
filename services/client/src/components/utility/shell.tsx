/**
 * Application shell component.
 *
 * Only current use is to display a loading screen when auth is loading.
 */

// External imports.
import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Disclosure } from "@headlessui/react"
import { useAuth0 } from "@auth0/auth0-react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

// Component imports.
import { Loading } from "#components/utility"

// Utility imports.
import { classNames } from "#utils/classes"
import { useUser } from "#utils/auth"

// Asset imports.

const navigation = [
  { name: "Dashboard", href: "/", matcher: /^\/?$/ },
  {
    name: "Members",
    href: "/members",
    matcher: /^\/members($|\/.*)/,
  },
]

/**
 * Application shell.
 */
export function Shell({ children }: { children?: ReactNode }) {
  const { isLoading, logout } = useAuth0()
  const user = useUser()
  const { pathname } = useLocation()
  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex items-stretch">
        <Loading />
      </div>
    )
  }
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col relative">
        <div className="py-2 px-4">
          <Disclosure
            as="nav"
            className="bg-fdarkgray max-w-4xl rounded-lg shadow-sm z-30 mx-auto"
          >
            {({ open }) => (
              <>
                <div className="px-6">
                  <div className="flex justify-between h-16">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                          <img
                            className="lg:block h-8 w-auto rounded-lg"
                            src="https://cdn.discordapp.com/icons/907723403639808030/a_70e2d397398980b971686a8da6b94487.png"
                            alt="Friends"
                          />
                        </Link>
                      </div>
                      <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              pathname.match(item.matcher)
                                ? "border-fblue text-fwhite"
                                : "border-transparent text-flightgray hover:border-flightgray",
                              "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            )}
                            aria-current={
                              pathname.match(item.matcher) ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                      {/* Profile dropdown */}
                      <div className="relative ml-3 flex justify-end items-center text-sm">
                        <div className="flex flex-col items-end mr-3">
                          <Link
                            to={`/members/${user.id}`}
                            className="text-fwhite"
                          >
                            {user.name}
                          </Link>
                          <button
                            className="text-fblue"
                            onClick={() => {
                              logout()
                            }}
                          >
                            Sign out
                          </button>
                        </div>
                        <Link
                          to={`/members/${user.id}`}
                          className="bg-stone-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative h-8 w-8"
                        >
                          <img
                            className="absolute inset rounded-full"
                            src={user.picture}
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center sm:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-fgray inline-flex items-center justify-center h-8 w-8 rounded-lg text-flightgray hover:text-fwhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fblue">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.href}
                        className={classNames(
                          pathname.match(item.matcher)
                            ? "border-fblue text-fwhite"
                            : "border-transparent text-flightgray hover:border-flightgray",
                          "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        )}
                        aria-current={
                          pathname.match(item.matcher) ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="pt-4 pb-3 border-t-2 border-fgray">
                    <Disclosure.Button
                      as={Link}
                      to={`/members/${user.id}`}
                      className="flex items-center px-4"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.picture}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-fwhite">
                          {user.nickname}
                        </div>
                        <div className="text-sm font-medium text-flightgray">
                          {user.name}
                        </div>
                      </div>
                    </Disclosure.Button>
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                        as="a"
                        onClick={() =>
                          logout({
                            logoutParams: { returnTo: window.location.origin },
                          })
                        }
                        className="block px-4 py-2 text-base font-medium text-fblue hover:cursor-pointer"
                      >
                        Log out
                      </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="h-full w-full z-0 flex-1 px-4 pb-2">
          <div className="h-full w-full max-w-4xl mx-auto bg-fdarkgray rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
