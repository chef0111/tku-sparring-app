import { renderQueryString } from 'nuqs/adapters/custom';

function stringifySearchValue(value: unknown): string {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  if (typeof value === 'string') {
    try {
      JSON.parse(value);
      return JSON.stringify(value);
    } catch {
      return value;
    }
  }
  return String(value);
}

/** Router `stringifySearch`. Keeps JSON braces readable in the query string. */
export function stringifySearch(search: Record<string, unknown>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value === undefined) continue;
    params.set(key, stringifySearchValue(value));
  }
  return renderQueryString(params);
}
