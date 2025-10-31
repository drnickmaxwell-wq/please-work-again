import type { MetadataRoute } from 'next';

import { MAIN_NAV, TREATMENTS, RESOURCES } from '@/lib/nav';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

const ensureLeadingSlash = (path: string) => (path.startsWith('/') ? path : `/${path}`);

const collectRoutes = () => {
  const routes = new Set<string>(['/']);

  const append = (paths: string[]) => {
    paths.forEach((path) => {
      if (path) {
        routes.add(ensureLeadingSlash(path));
      }
    });
  };

  const mainRoutes = MAIN_NAV.filter((item) => item.enabled !== false).map((item) => item.href);
  const resourceRoutes = RESOURCES.filter((item) => item.enabled !== false).map((item) => item.href);
  const treatmentRoutes = TREATMENTS.filter((item) => item.enabled !== false).map((item) => item.href);

  append(mainRoutes);
  append(resourceRoutes);
  append(treatmentRoutes);

  append([
    '/treatments/composite-bonding',
    '/treatments/dental-implants',
    '/treatments/veneers',
    '/treatments/whitening',
    '/treatments/general',
    '/treatments/cosmetic',
    '/treatments/3d-dentistry',
    '/treatments/orthodontics',
    '/treatments/technology',
  ]);

  return Array.from(routes);
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return collectRoutes().map((path) => ({
    url: `${canonicalBase}${path}`,
    lastModified,
  }));
}
