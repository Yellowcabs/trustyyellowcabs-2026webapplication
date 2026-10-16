import React, { useEffect } from 'react';
import { SEO_PAGE_CANDIDATES } from '../data/seoPageCandidates';
import {
  CORE_SEO_ROUTES,
  getSiteStructuredData,
  NOT_FOUND_SEO,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_URL,
  TAXI_SERVICE_FAQ,
  SeoHead,
} from '../data/siteSeo';

export { SITE_URL };

const getRouteSeo = (pathname: string): SeoHead => {
  const configuredPage = SEO_PAGE_CANDIDATES.find((page) => page.path === pathname && page.status === 'published');
  if (configuredPage) {
    return {
      title: configuredPage.title,
      description: configuredPage.description,
      robots: 'index, follow',
      canonical: `${SITE_URL}${configuredPage.path === '/' ? '/' : configuredPage.path}`,
    };
  }

  return CORE_SEO_ROUTES[pathname] || {
    ...NOT_FOUND_SEO,
    canonical: `${SITE_URL}${pathname}`,
  };
};

const shouldIncludeServiceSchema = (
  pathname: string,
  configuredPage: (typeof SEO_PAGE_CANDIDATES)[number] | undefined,
) => (
  pathname === '/' || pathname === '/services' || pathname === '/taxi-service-in-coimbatore'
  || Boolean(configuredPage && configuredPage.category !== 'existing')
);

export const SEO: React.FC<{ pathname: string }> = ({ pathname }) => {
  const seo = getRouteSeo(pathname);
  const configuredPage = SEO_PAGE_CANDIDATES.find((page) => page.path === pathname && page.status === 'published');
  const structuredData = getSiteStructuredData(seo, {
    includeService: shouldIncludeServiceSchema(pathname, configuredPage),
    faq: pathname === '/taxi-service-in-coimbatore' ? TAXI_SERVICE_FAQ : undefined,
  });

  useEffect(() => {
    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      const matches = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector));
      const meta = matches[0] || document.createElement('meta');
      matches.slice(1).forEach((node) => node.remove());
      meta.setAttribute(attribute, key);
      meta.setAttribute('content', content);
      if (!meta.parentNode) document.head.appendChild(meta);
    };

    const canonicalLinks = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    const canonicalLink = canonicalLinks[0] || document.createElement('link');
    canonicalLinks.slice(1).forEach((node) => node.remove());
    canonicalLink.rel = 'canonical';
    canonicalLink.href = seo.canonical;
    if (!canonicalLink.parentNode) document.head.appendChild(canonicalLink);

    document.title = seo.title;
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[name="robots"]', 'name', 'robots', seo.robots);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', SITE_LOGO_URL);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', SITE_LOGO_URL);

    const script = (document.getElementById('seo-jsonld') as HTMLScriptElement | null) || document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    if (!script.parentNode) document.head.appendChild(script);
  }, [pathname]);

  return null;
};
