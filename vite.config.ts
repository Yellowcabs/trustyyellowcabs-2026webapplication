import path from "path";
import fs from "fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { PUBLISHED_SEO_PAGES } from "./data/seoPageCandidates";
import { getSeoRelatedLinks } from "./data/seoInternalLinks";

const baseSeoRouteHeads: Record<string, { title: string; description: string; robots: string; canonical: string }> = {
  about: { title: 'About FastPointCab | Coimbatore Taxi Service', description: 'Learn about FastPointCab and our approach to dependable city, airport, and outstation taxi services in Coimbatore.', robots: 'index, follow', canonical: 'https://www.fastpointcab.in/about' },
  fleet: { title: 'Taxi Fleet in Coimbatore | FastPointCab', description: 'Explore FastPointCab vehicles for Coimbatore city rides, airport transfers, rentals, and outstation travel.', robots: 'index, follow', canonical: 'https://www.fastpointcab.in/fleet' },
  services: { title: 'Local, Airport & Outstation Taxi Services | FastPointCab', description: 'View FastPointCab taxi services in Coimbatore, including local rides, airport transfers, hourly rentals, and outstation trips.', robots: 'index, follow', canonical: 'https://www.fastpointcab.in/services' },
  contact: { title: 'Contact FastPointCab | Coimbatore Taxi Booking', description: 'Contact FastPointCab for taxi booking, WhatsApp support, and reliable travel services in Coimbatore, Tamil Nadu.', robots: 'index, follow', canonical: 'https://www.fastpointcab.in/contact' },
  'taxi-service-in-coimbatore': { title: 'Taxi Service in Coimbatore | FastPointCab', description: 'Book a Coimbatore taxi with FastPointCab for local rides, airport transfers, hourly rentals, outstation trips, and business travel.', robots: 'index, follow', canonical: 'https://www.fastpointcab.in/taxi-service-in-coimbatore' },
  'book-a-trip': { title: 'Book a Trip | FastPointCab', description: 'Book a taxi trip with FastPointCab in Coimbatore.', robots: 'noindex, nofollow', canonical: 'https://www.fastpointcab.in/book-a-trip' },
  'booking-confirmed': { title: 'Booking Confirmed | FastPointCab', description: 'Your FastPointCab booking confirmation.', robots: 'noindex, nofollow', canonical: 'https://www.fastpointcab.in/booking-confirmed' },
};

const seoRouteHeads = {
  ...baseSeoRouteHeads,
  ...Object.fromEntries(
    PUBLISHED_SEO_PAGES
      .filter((page) => page.path !== '/')
      .map((page) => [page.path.slice(1), {
        title: page.title,
        description: page.description,
        robots: 'index, follow',
        canonical: `https://www.fastpointcab.in${page.path}`,
      }])
  ),
};

const rootSeoHead = {
  title: 'Taxi Service in Coimbatore | FastPointCab',
  description: 'Book FastPointCab for city taxi rides, airport transfers, outstation trips, and hourly rentals in Coimbatore.',
  robots: 'index, follow',
  canonical: 'https://www.fastpointcab.in/',
};

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const staticSeoBody = (routePath: string, seo: { title: string; description: string }) => {
  const candidate = PUBLISHED_SEO_PAGES.find((page) => page.path === routePath);
  const heading = candidate?.heading || seo.title.split(' | ')[0];
  const category = candidate?.category;
  const planning = category === 'area'
    ? `Use a precise landmark or address for ${heading.replace(' Taxi Service', '')} and add the destination before requesting a trip.`
    : category === 'airport-route'
      ? 'Include the airport terminal, pickup or drop timing, and the complete destination so the airport transfer request is clear.'
      : category === 'outstation-route'
        ? 'Enter the complete pickup and destination, choose one-way or round-trip, and review the travel date and vehicle details.'
        : category === 'vehicle-rental'
          ? 'Review the vehicle or rental option in the booking flow after entering the route, passenger details, and requested travel date.'
          : 'Enter accurate pickup and destination details, provide a reachable mobile number, and review the trip summary before confirming.';
  const relatedLinks = candidate ? getSeoRelatedLinks(candidate, PUBLISHED_SEO_PAGES) : [];
  const relatedMarkup = relatedLinks.map((link) => `<li><a href="${link.path}">${escapeHtml(link.label)}</a></li>`).join('');
  const sectionHeading = category === 'area'
    ? `Travel from ${heading.replace(' Taxi Service', '')}`
    : category === 'airport-route'
      ? 'Plan this airport transfer'
      : category === 'outstation-route'
        ? 'Prepare for this outstation journey'
        : category === 'vehicle-rental'
          ? 'Choose a vehicle or rental option'
          : 'How this FastPointCab service works';

  return `<main id="seo-static-content" class="min-h-screen bg-white"><div class="container mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-6 lg:px-8"><nav aria-label="Breadcrumb" class="mb-6 text-xs font-semibold text-slate-500"><a href="/">Home</a><span aria-hidden="true"> / </span><span>${escapeHtml(heading)}</span></nav><header class="max-w-4xl"><p class="mb-3 text-xs font-bold uppercase tracking-widest text-[#FF5F68]">Coimbatore taxi booking</p><h1 class="text-4xl font-extrabold leading-tight text-[#0B1733]">${escapeHtml(heading)}</h1><p class="mt-5 max-w-2xl text-base leading-7 text-slate-600">${escapeHtml(seo.description)}</p></header><section class="mt-10 max-w-3xl border-y border-slate-200 py-8"><h2 class="text-2xl font-extrabold text-[#0B1733]">Plan your FastPointCab trip</h2><p class="mt-4 text-base leading-7 text-slate-600">${escapeHtml(planning)}</p><nav class="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-[#0B1733]" aria-label="Related FastPointCab pages"><a href="/">Start a booking</a><a href="/services">View taxi services</a><a href="/fleet">Explore the fleet</a><a href="/contact">Contact FastPointCab</a></nav></section><section class="mt-10 max-w-4xl border-t border-slate-200 py-8"><h2 class="text-2xl font-extrabold text-[#0B1733]">${escapeHtml(sectionHeading)}</h2><p class="mt-4 max-w-3xl text-base leading-7 text-slate-600">${escapeHtml(planning)}</p></section><section class="max-w-4xl border-t border-slate-200 py-8"><h2 class="text-2xl font-extrabold text-[#0B1733]">Related FastPointCab pages</h2><ul class="mt-4 grid gap-3 sm:grid-cols-2">${relatedMarkup}</ul></section></div></main>`;
};

const staticJsonLd = (seo: { canonical: string; description: string }) => JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://www.fastpointcab.in/#organization', name: 'FastPointCab', url: 'https://www.fastpointcab.in', logo: 'https://www.fastpointcab.in/images/taxi-icon-512.png', telephone: '+919488834020' },
    { '@type': 'TaxiService', '@id': 'https://www.fastpointcab.in/#taxi-service', name: 'FastPointCab', url: 'https://www.fastpointcab.in', telephone: '+919488834020', areaServed: { '@type': 'City', name: 'Coimbatore' }, parentOrganization: { '@id': 'https://www.fastpointcab.in/#organization' } },
    { '@type': 'WebSite', '@id': 'https://www.fastpointcab.in/#website', name: 'FastPointCab', url: 'https://www.fastpointcab.in', publisher: { '@id': 'https://www.fastpointcab.in/#organization' } },
    ...(!['/about', '/fleet', '/contact', '/book-a-trip', '/booking-confirmed'].some((path) => seo.canonical.endsWith(path)) ? [{ '@type': 'Service', '@id': `${seo.canonical}#service`, name: 'Taxi service in Coimbatore', serviceType: 'Taxi service', provider: { '@id': 'https://www.fastpointcab.in/#taxi-service' }, areaServed: { '@type': 'City', name: 'Coimbatore' }, description: seo.description }] : []),
    ...(seo.canonical !== 'https://www.fastpointcab.in/' && !seo.canonical.endsWith('/book-a-trip') && !seo.canonical.endsWith('/booking-confirmed') ? [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.fastpointcab.in/' }, { '@type': 'ListItem', position: 2, name: seo.canonical.split('/').pop()?.replace(/-/g, ' '), item: seo.canonical }] }] : []),
  ],
});

const staticSeoPlugin = () => ({
  name: 'generate-static-seo-route-heads',
  apply: 'build' as const,
  closeBundle() {
    const distIndex = path.resolve(__dirname, 'dist/index.html');
    const template = fs.readFileSync(distIndex, 'utf8');
    const writeRoute = (route: string, seo: { title: string; description: string; robots: string; canonical: string }, source: string, includeStaticBody = false) => {
      const routeHead = source
        .replace(/<title[^>]*>.*?<\/title>/s, `<title data-rh="true">${seo.title}</title>`)
        .replace(/<meta[^>]*name="description"[^>]*>/, `<meta data-rh="true" name="description" content="${seo.description}">`)
        .replace(/<meta[^>]*name="robots"[^>]*>/, `<meta data-rh="true" name="robots" content="${seo.robots}">`)
        .replace(/<link[^>]*rel="canonical"[^>]*>/, `<link data-rh="true" rel="canonical" href="${seo.canonical}">`)
        .replace(/<meta[^>]*property="og:title"[^>]*>/, `<meta data-rh="true" property="og:title" content="${seo.title}">`)
        .replace(/<meta[^>]*property="og:description"[^>]*>/, `<meta data-rh="true" property="og:description" content="${seo.description}">`)
        .replace(/<meta[^>]*property="og:url"[^>]*>/, `<meta data-rh="true" property="og:url" content="${seo.canonical}">`)
        .replace(/<meta[^>]*name="twitter:title"[^>]*>/, `<meta data-rh="true" name="twitter:title" content="${seo.title}">`)
        .replace(/<meta[^>]*name="twitter:description"[^>]*>/, `<meta data-rh="true" name="twitter:description" content="${seo.description}">`)
        .replace(/<script id="seo-jsonld" type="application\/ld\+json">.*?<\/script>/s, `<script id="seo-jsonld" type="application/ld+json">${staticJsonLd(seo)}</script>`)
        .replace('<div id="root"></div>', `${includeStaticBody ? staticSeoBody(route ? `/${route}` : '/', seo) : ''}<div id="root"></div>`);
      const routeDir = route ? path.resolve(__dirname, 'dist', route) : path.resolve(__dirname, 'dist');
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), routeHead);
    };

    writeRoute('', rootSeoHead, template, false);
    for (const [route, seo] of Object.entries(seoRouteHeads)) {
      writeRoute(route, seo, template, seo.robots === 'index, follow');
    }
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    plugins: [staticSeoPlugin(), tailwindcss(), react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },

    define: {
      "process.env.VITE_GOOGLE_MAPS_API_KEY": JSON.stringify(
        env.VITE_GOOGLE_MAPS_API_KEY
      ),
    },

   build: {
  target: "es2019",
  sourcemap: false,
  minify: "esbuild",

  cssCodeSplit: true,

  rollupOptions: {
    output: {
      manualChunks: {
        vendor: [
          "react",
          "react-dom"
        ],
      },

      assetFileNames: (assetInfo) => {
        if (/\.(png|jpe?g|webp|svg|gif)$/i.test(assetInfo.name ?? "")) {
          return "assets/images/[name]-[hash][extname]";
        }

        if (/\.css$/i.test(assetInfo.name ?? "")) {
          return "assets/css/[name]-[hash][extname]";
        }

        return "assets/js/[name]-[hash][extname]";
      },
    },
  },
},

    optimizeDeps: {
      include: [
        "react",
        "react-dom"
      ],
    },

    preview: {
      port: 4173,
    },
  };
});
