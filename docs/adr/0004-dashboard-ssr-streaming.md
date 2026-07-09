# Dashboard SSR Streaming

Status: Accepted — 2026-07-09

## Context

Dashboard routes mixed `ensureQueryData` and fire-and-forget prefetch without a clear critical/deferred split. Feature UI often used `useQuery` without Suspense, so SSR could not stream section shells. List routes also risked TanStack Query key mismatches when URL filters (nuqs) were not reflected in loader deps. Error handling was uneven: deferred panels could take down a whole page, and missing tournaments lacked a consistent not-found path.

## Decision

Adopt a consistent SSR streaming model for dashboard (home, tournaments list, command center, athletes, builder):

- **Critical await + deferred prefetch** — loaders `await ensureQueryData` only for route-identity data that the chrome needs before paint (e.g. tournament detail on `$id` / builder). List/home page bodies use `void prefetchQuery` so client navigations stay instant and Suspense streams the table/grid/hub content
- **`useSuspenseQuery`** for always-on dashboard reads that participate in streaming
- **Suspense islands** in `features/dashboard` with existing skeletons; isolate failures with `ErrorBoundary`
- **`loaderDeps` + nuqs parse helpers** — shared parse functions feed both loaders and table state; no `validateSearch` on these routes
- **Route `errorComponent`s** for loader / route failures; tournament missing → clear not-found UI with link back
- **Builder session gate** — `beforeLoad` ensures session and redirects to login when unauthenticated

## Alternatives considered

- **Await everything in the loader** — rejected; blocks TTFB and prevents progressive paint of deferred panels
- **`validateSearch` for list filters** — deferred; nuqs already owns URL state; parse helpers + `loaderDeps` keep keys aligned without a second schema layer
- **`react-error-boundary` dependency** — rejected; small class + `useQueryErrorResetBoundary` wrapper is enough

## Consequences

- Client navigations to home / tournaments / athletes paint the shell immediately; list bodies show skeletons then fill
- Hard-refresh still starts server prefetch; deferred panels / lists stream via Suspense
- One failing deferred island does not blank the whole command center / home / list page
- Filtered tournament/athlete URLs prefetch the same query key the table reads
- Unauthenticated builder visits redirect to `/login`
- Orphaned pathless `dashboard/_tournaments` layout removed; route tree no longer nests under a no-op Outlet
