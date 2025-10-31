/**
 * Resolves an asset path against an optional CDN base.
 * If NEXT_PUBLIC_CDN is unset, returns the original path (served from /public).
 * Always accepts paths with or without a leading slash.
 */
export function asset(path: string) {
  const base = (process.env.NEXT_PUBLIC_CDN || "").replace(/\/+$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${clean}` : clean;
}
