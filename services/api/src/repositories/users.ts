/**
 * Users repository.
 */

// Utility imports.
import { cache } from "#utils/cache"
import { ServerError } from "#utils/exceptions"
import { discord } from "#utils/http"
import { logger } from "#utils/logger"

/**
 * The users repository class.
 */
class UserRepository {
  /**
   * Method to check if a user is a member.
   */
  async check(id: string): Promise<boolean> {
    // Get the cached membership.
    const cached = await cache.get<{ member: boolean }>(`membership:${id}`)
    // If there is no cached membership, fetch from Discord API.
    if (!cached?.member) {
      // Get the member.
      const response = await discord.get(`/members/${id}`)
      // 404 means they are not a member, other errors are legit.
      if (response.status === 404) {
        await cache.set(`membership:${id}`, { member: false })
        return false
      } else if (response.status !== 200) {
        logger.error(response)
        throw new ServerError("Failed to fetch user from Discord.")
      }
      await cache.set(`membership:${id}`, { member: true })
      return true
    }
    return cached.member
  }

  /**
   * Method to get member details.
   */
  async get(id: string): Promise<DiscordMember | undefined> {
    // Get cached details.
    const cached = await cache.get<DiscordMember | { user: false }>(
      `members:${id}`
    )
    // If no cached details, get from Discord API.
    if (!cached) {
      const response = await discord.get(`/members/${id}`)
      if (response.status === 404) {
        await cache.set(`members:${id}`, { user: false })
        return
      } else if (response.status !== 200) {
        logger.error(response)
        throw new ServerError("Failed to fetch user from Discord.")
      }
      await cache.set(`members:${id}`, response.data)
      return response.data
    }
    return cached.user === false ? undefined : cached
  }

  /**
   * Method to list members of the server.
   */
  async list({
    after,
    limit = 100,
  }: {
    after?: string
    limit?: number
  }): Promise<{ members: DiscordMember[] | undefined; more: boolean }> {
    const key = after ? `members.after.${after}` : "members"
    const cached = await cache.get<DiscordMember[]>(key)
    if (!cached) {
      const response = await discord.get("/members", {
        params: {
          limit,
          after,
        },
      })
      if (response.status !== 200) {
        console.log(response.data)
        console.log(response.status)
        throw new ServerError("Unable to fetch users from Discord.")
      }
      await cache.set(key, response.data)
      const members: DiscordMember[] = response.data
      return {
        members,
        more: members && members.length >= limit,
      }
    }
    return {
      members: cached,
      more: cached && cached.length >= limit,
    }
  }
}

// Export the repository instance.
export const users = new UserRepository()
