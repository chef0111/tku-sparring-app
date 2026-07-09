# Dashboard SSR Streaming

Status: Accepted — 2026-07-09

## Context

Dashboard routes mixed `ensureQueryData` and fire-and-forget prefetch without a clear critical/deferred split. Feature UI often used `useQuery` without Suspense, so SSR could not stream section shells. List routes also risked TanStack Query key mismatches when URL filters (nuqs) were not reflected in loader deps. Error handling was uneven: deferred panels could take down a whole page, and missing tournaments lacked a consistent not-found path.

## Decision

Adopt a consistent SSR streaming model for dashboard (home, tournaments list, command center, athletes, builder):

- **Critical await + deferred prefetch** — loaders `await ensureQueryData` for route-identity data (`$id` / builder tournament) and for **athletes / tournaments enter** (so `pendingComponent` can replace the previous outlet). Home uses `void prefetchQuery` + `useQuery` skeletons
- **`useSuspenseQuery`** for detail routes; **`useQuery` + `keepPreviousData`** for athletes / tournaments / home list bodies
- **Suspense islands** where the loader already awaited critical data (command center deferred panels, builder tabs); list bodies use inline skeletons or dimmed previous rows
- **List `pendingComponent`s** — `AthletesPending` / `TournamentsPending` on route enter; sort/filter keep prior rows at 50% opacity via `isPlaceholderData` (no skeleton flash)
- **`loaderDeps` + nuqs parse helpers** — shared parse functions feed both loaders and table state; no `validateSearch` on these routes
- **Route `errorComponent`s** for loader / route failures; tournament missing → clear not-found UI with link back
- **Cache-first session gate** — `requireSession` uses `getQueryData` on warm cache (sync `beforeLoad` for sibling nav); `ensureQueryData` only on cache miss. Shared by `/dashboard` and builder
- **RSC** — not required for interactive nuqs list tables; do not enable unless product asks

## Alternatives considered

- **Await everything in the loader** — rejected; blocks TTFB and prevents progressive paint of deferred panels
- **`validateSearch` for list filters** — deferred; nuqs already owns URL state; parse helpers + `loaderDeps` keep keys aligned without a second schema layer
- **`react-error-boundary` dependency** — rejected; small class + `useQueryErrorResetBoundary` wrapper is enough

## Consequences

- Client navigations to home paint the shell immediately; body shows `useQuery` skeletons then fill
- Navigations to athletes / tournaments show route `pendingComponent` until the list query is ready; sort/filter keep prior rows dimmed (`keepPreviousData` + `isPlaceholderData`)
- Warm-session sibling hops do not re-await session in layout `beforeLoad`, so the outlet is not held on an async parent gate
- Hard-refresh still starts server prefetch; detail deferred panels and athletes filter changes stream via Suspense
- One failing deferred island does not blank the whole command center
- Filtered tournament/athlete URLs prefetch the same query key the table reads
- Unauthenticated dashboard / builder visits redirect to `/login`
- Orphaned pathless `dashboard/_tournaments` layout removed; route tree no longer nests under a no-op Outlet
