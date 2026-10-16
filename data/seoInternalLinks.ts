import { PUBLISHED_SEO_PAGES, SeoPageCandidate } from './seoPageCandidates';

export interface SeoRelatedLink {
  path: string;
  label: string;
}

const categoryHub: Partial<Record<SeoPageCandidate['category'], SeoRelatedLink>> = {
  'coimbatore-service': { path: '/taxi-service-in-coimbatore', label: 'Taxi service in Coimbatore' },
  area: { path: '/local-taxi-coimbatore', label: 'Local taxi in Coimbatore' },
  'airport-route': { path: '/airport-taxi-coimbatore', label: 'Airport taxi in Coimbatore' },
  'outstation-route': { path: '/outstation-taxi-coimbatore', label: 'Outstation taxi from Coimbatore' },
  'vehicle-rental': { path: '/fleet', label: 'Explore the TrustyYellowCabs fleet' },
};

export const getSeoRelatedLinks = (
  page: SeoPageCandidate,
  pages: SeoPageCandidate[] = PUBLISHED_SEO_PAGES,
): SeoRelatedLink[] => {
  const links: SeoRelatedLink[] = [
    { path: '/', label: 'Start a booking' },
    ...(categoryHub[page.category] ? [categoryHub[page.category] as SeoRelatedLink] : []),
  ];
  const sameCategory = pages.filter((candidate) => candidate.category === page.category && candidate.path !== page.path);
  const currentIndex = pages.filter((candidate) => candidate.category === page.category).findIndex((candidate) => candidate.path === page.path);

  if (sameCategory.length > 0) {
    const previous = sameCategory[(currentIndex - 1 + sameCategory.length) % sameCategory.length];
    const next = sameCategory[currentIndex % sameCategory.length];
    links.push({ path: previous.path, label: previous.heading });
    if (next.path !== previous.path) links.push({ path: next.path, label: next.heading });
  }

  return links.filter((link, index, all) => link.path !== page.path && all.findIndex((item) => item.path === link.path) === index).slice(0, 4);
};
