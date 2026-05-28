import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from '@/shared/components'
import { useAuth } from '@/modules/auth/hooks/use-auth'
import { ROUTES } from '@/shared/constants/routes'

/** Redirects already-authenticated users away from login/register. */
export function PublicRoute() {
  const { session, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="route-fallback">
        <Spinner label="Loading..." />
      </div>
    )
  }

  if (session) {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  return <Outlet />
}
