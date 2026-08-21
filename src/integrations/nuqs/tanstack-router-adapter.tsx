/**
 * TanStack Router nuqs adapter with correct serialization for array search values.
 *
 * Upstream `nuqs/adapters/tanstack-router` does `value.map((v) => [key, v])` for arrays.
 * TanStack Router parses JSON search (e.g. `sort=[{...}]`) into arrays of objects.
 * 1) Array elements must become strings for `URLSearchParams` (no `[object Object]`).
 * 2) Keys like `sort` / `filters` must be a *single* JSON array string so `param.get()`
 *    matches what `getSortingStateParser` / `getFiltersStateParser` expect from `serialize`.
 * 3) Primitive arrays (`status`, `gender`, …) must be one comma-joined value — `parseAsArrayOf`
 *    uses `.get()`, not `.getAll()`.
 *
 * `updateUrl` writes `href` (path + query), not `to`. `to` is decoded as a path,
 * and TanStack percent-encodes `{` `}` there. Pair with `stringifySearch` in
 * `getRouter` so the router does not re-encode braces via `URLSearchParams`.
 *
 * @see https://github.com/47ng/nuqs/issues (upstream fix when available)
 */
import { startTransition, useCallback, useMemo } from 'react';
import { useLocation, useRouter } from '@tanstack/react-router';
import {
  unstable_createAdapterProvider as createAdapterProvider,
  renderQueryString,
} from 'nuqs/adapters/custom';

/** Search keys serialized as a single JSON array string by nuqs object-array parsers. */
export const JSON_ARRAY_SEARCH_KEYS = new Set(['sort', 'filters']);

export function searchValueToParamPairs(
  key: string,
  value: unknown
): Array<[string, string]> {
  if (value === undefined || value === null) return [];

  if (Array.isArray(value)) {
    if (value.length === 0) {
      // Preserve explicit empty sort/filters so nuqs can distinguish [] from "param absent".
      if (JSON_ARRAY_SEARCH_KEYS.has(key)) {
        return [[key, '[]']];
      }
      return [];
    }
    // Keys like `sort` / `filters`: nuqs serializes the whole array as one JSON string.
    // Emit a single param so `.get(key)` matches `createParser` + `JSON.parse` expectations.
    if (value.some((item) => item !== null && typeof item === 'object')) {
      return [[key, JSON.stringify(value)]];
    }
    // parseAsArrayOf reads one comma-joined value via `.get()`, not repeated keys.
    return [[key, value.map(String).join(',')]];
  }

  if (typeof value === 'object') {
    return [[key, JSON.stringify(value)]];
  }

  return [[key, String(value)]];
}

/** Rebuild `URLSearchParams` from TanStack Router JSON-parsed `location.search`. */
export function searchRecordToURLSearchParams(
  search: Record<string, unknown>
): URLSearchParams {
  return new URLSearchParams(
    Object.entries(search).flatMap(([key, value]) =>
      searchValueToParamPairs(key, value)
    )
  );
}

function useNuqsTanstackRouterAdapter(watchKeys: Array<string>) {
  const pathname = useLocation({ select: (state) => state.pathname });
  const hash = useLocation({ select: (state) => state.hash });
  const search = useLocation({
    select: (state) =>
      Object.fromEntries(
        Object.entries(state.search as Record<string, unknown>).filter(
          ([key]) => watchKeys.includes(key)
        )
      ),
  });
  const { navigate } = useRouter();

  return {
    searchParams: useMemo(
      () => searchRecordToURLSearchParams(search),
      [search, watchKeys.join(',')]
    ),
    updateUrl: useCallback(
      (
        nextSearch: URLSearchParams,
        options: { history?: string; scroll?: boolean }
      ) => {
        startTransition(() => {
          navigate({
            href: `${pathname}${renderQueryString(nextSearch)}${hash ? `#${hash}` : ''}`,
            replace: options.history === 'replace',
            resetScroll: options.scroll,
            state: (state) => state,
          });
        });
      },
      [hash, navigate, pathname]
    ),
    rateLimitFactor: 1,
  };
}

export const NuqsAdapter = createAdapterProvider(useNuqsTanstackRouterAdapter);
