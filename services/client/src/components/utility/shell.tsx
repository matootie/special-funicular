/**
 * Application shell component.
 *
 * Only current use is to display a loading screen when auth is loading.
 */

// External imports.
import { ReactNode, Fragment } from "react"
import { Link, useLocation } from "react-router-dom"
import { Disclosure, Menu, Transition } from "@headlessui/react"
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
  const { isLoading, loginWithRedirect, logout } = useAuth0()
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
    <div className="h-screen flex flex-col relative">
      <Disclosure
        as="nav"
        className="bg-fdarkgray shadow-sm z-30"
      >
        {({ open }) => (
          <>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="lg:block h-8 w-auto rounded-lg"
                      src="https://cdn.discordapp.com/icons/907723403639808030/a_70e2d397398980b971686a8da6b94487.png"
                      alt="Friends"
                    />
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
                  <Menu
                    as="div"
                    className="ml-3 relative"
                  >
                    <div>
                      <Link
                        to={`/members`}
                        className="bg-stone-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.picture}
                          alt=""
                        />
                      </Link>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-stone-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/users/${user.sub?.split("|")[2]}`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                              )}
                            >
                              My profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() =>
                                logout({
                                  logoutParams: {
                                    returnTo: window.location.origin,
                                  },
                                })
                              }
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                              )}
                            >
                              Log out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-stone-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
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
              {user ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.picture}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.nickname}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="a"
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:cursor-pointer"
                    >
                      Log out
                    </Disclosure.Button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 pb-3 px-4 border-gray-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      loginWithRedirect({
                        appState: { returnTo: pathname },
                      })
                    }
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Log in with Discord
                  </button>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="h-full z-0 flex-1 overflow-scroll">{children}</div>
    </div>
  )
}
