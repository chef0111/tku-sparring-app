/**
 * Resolve a file under `public/assets` (local) or `VITE_ASSETS_URL` (hosted CDN).
 *
 * Local: leave `VITE_ASSETS_URL` unset → `/assets/...`
 * Production: `VITE_ASSETS_URL=https://assets.giabao.dev/kyorbit`
 */
export function assetUrl(path: string): string {
  const base = (import.meta.env.VITE_ASSETS_URL ?? '/assets').replace(
    /\/+$/,
    ''
  );
  const file = path.replace(/^\/+/, '').replace(/^assets\//, '');
  return `${base}/${file}`;
}
