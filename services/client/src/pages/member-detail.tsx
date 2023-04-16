import { useParams } from "react-router-dom"
import { useMember } from "#utils/api"
import { Loading } from "#components/utility"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

export function MemberDetail() {
  const { memberId } = useParams()
  if (!memberId) throw new Error("Missing member ID in path params.")
  const { isLoading, data } = useMember(memberId)
  if (isLoading) {
    return (
      <div className="py-16">
        <Loading />
      </div>
    )
  }
  if (data) {
    return (
      <div>
        <nav
          className="mx-auto flex w-full px-4 py-2 space-x-2 items-center"
          aria-label="Breadcrumb"
        >
          <a
            href="/members"
            className="text-sm font-medium text-flightgray"
            aria-current="page"
          >
            Members
          </a>
          <ChevronRightIcon className="w-5 h-5 text-flightgray" />
          <span
            className="text-sm font-medium text-flightgray"
            aria-current="page"
          >
            {data.nick || data.user.username}
          </span>
        </nav>
        <div className="py-16">
          <p className="text-center text-flightgray italic text-sm">
            Member detail page is under construction.
          </p>
        </div>
      </div>
    )
  }
  return <p className="text-center">An unexpected error has occurred.</p>
}
