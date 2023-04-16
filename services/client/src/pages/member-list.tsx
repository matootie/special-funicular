import { Loading } from "#components/utility"
import { useMembers } from "#utils/api"
import { getAvatarUrl } from "#utils/discord"
import { Link } from "react-router-dom"

export function MemberList() {
  const { isLoading, data } = useMembers()
  if (isLoading) {
    return (
      <div className="py-16">
        <Loading />
      </div>
    )
  }
  if (data) {
    return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {data.members.map((member) => (
          <Link
            to={`/members/${member.user.id}`}
            key={member.user.id}
            className="bg-fgray rounded-lg px-3 py-2 flex items-center space-x-3 border-2 border-transparent hover:border-fblue shadow transform hover:-translate-y-0.5 transition-transform"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={getAvatarUrl(
                member.user.id,
                member.avatar || member.user.avatar,
                member.user.discriminator
              )}
            />
            <span className="text-sm text-fwhite font-semibold">
              {member.nick || member.user.username}
            </span>
          </Link>
        ))}
      </ul>
    )
  }
  return <p className="text-center">An unexpected error has occurred.</p>
}
