import { queryOptions } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { getSession } from '@/lib/session';
import { sessionKeys } from '@/queries/keys';

export function sessionQueryOptions() {
  return queryOptions({
    queryKey: sessionKeys.current(),
    queryFn: () => getSession(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

type SessionData = Awaited<ReturnType<typeof getSession>>;
type SessionUser = NonNullable<SessionData>['user'];

/**
 * Cache-first session gate for route `beforeLoad`.
 * Warm cache → sync return (sibling nav does not await / hold the outlet).
 * Cache miss → ensureQueryData (cold dashboard entry).
 */
export function requireSession(
  queryClient: QueryClient
): { user: SessionUser } | Promise<{ user: SessionUser }> {
  const options = sessionQueryOptions();
  const cached = queryClient.getQueryData(options.queryKey);

  const gate = (session: SessionData | undefined) => {
    if (!session) {
      throw redirect({ to: '/login' });
    }
    return { user: session.user };
  };

  if (cached !== undefined) {
    return gate(cached);
  }

  return queryClient.ensureQueryData(options).then(gate);
}
