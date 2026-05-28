import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/constants/query-keys'
import { useAuth } from './use-auth'
import { profileService } from '../services/profile.service'

/** Fetches the current user's profile row (full_name, avatar_url). */
export function useProfile() {
  const { user } = useAuth()
  const userId = user?.id

  return useQuery({
    queryKey: userId ? QUERY_KEYS.profile(userId) : ['profile', 'anonymous'],
    queryFn: () => profileService.getById(userId as string),
    enabled: Boolean(userId),
  })
}
