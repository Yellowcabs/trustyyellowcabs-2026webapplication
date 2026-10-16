import path from "path";
import fs from "fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { PUBLISHED_SEO_PAGES } from "./data/seoPageCandidates";
import { getSeoRelatedLinks } from "./data/seoInternalLinks";
import {
  CORE_SEO_ROUTES,
  getSiteStructuredData,
  SITE_URL,
  SeoHead,
  TAXI_SERVICE_FAQ,
} from "./data/siteSeo";

const seoRouteHeads: Record<string, SeoHead> = {
  about: CORE_SEO_ROUTES['/about'],
  fleet: CORE_SEO_ROUTES['/fleet'],
  services: CORE_SEO_ROUTES['/services'],
  contact: CORE_SEO_ROUTES['/contact'],
  'taxi-service-in-coimbatore': CORE_SEO_ROUTES['/taxi-service-in-coimbatore'],
  'book-a-trip': CORE_SEO_ROUTES['/book-a-trip'],
  'booking-confirmed': CORE_SEO_ROUTES['/booking-confirmed'],
  ...Object.fromEntries(
    PUBLISHED_SEO_PAGES
      .filter((page) => page.path !== '/')
      .map((page) => [page.path.slice(1), {
        title: page.title,
        description: page.description,
        robots: 'index, follow',
        canonical: `${SITE_URL}${page.path}`,
      }])
  ),
};

const rootSeoHead = CORE_SEO_ROUTES['/'];

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
          : 'How this TrustyYellowCabs service works';

  return `<main id="seo-static-content" class="min-h-screen bg-white"><div class="container mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-6 lg:px-8"><nav aria-label="Breadcrumb" class="mb-6 text-xs font-semibold text-[#525252]"><a href="/">Home</a><span aria-hidden="true"> / </span><span>${escapeHtml(heading)}</span></nav><header class="max-w-4xl"><p class="mb-3 text-xs font-bold uppercase tracking-widest text-[#FFC107]">Coimbatore taxi booking</p><h1 class="text-4xl font-extrabold leading-tight text-[#171717]">${escapeHtml(heading)}</h1><p class="mt-5 max-w-2xl text-base leading-7 text-[#525252]">${escapeHtml(seo.description)}</p></header><section class="mt-10 max-w-3xl border-y border-[#E5E7EB] py-8"><h2 class="text-2xl font-extrabold text-[#171717]">Plan your TrustyYellowCabs trip</h2><p class="mt-4 text-base leading-7 text-[#525252]">${escapeHtml(planning)}</p><nav class="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-[#171717]" aria-label="Related TrustyYellowCabs pages"><a href="/">Start a booking</a><a href="/services">View taxi services</a><a href="/fleet">Explore the fleet</a><a href="/contact">Contact TrustyYellowCabs</a></nav></section><section class="mt-10 max-w-4xl border-t border-[#E5E7EB] py-8"><h2 class="text-2xl font-extrabold text-[#171717]">${escapeHtml(sectionHeading)}</h2><p class="mt-4 max-w-3xl text-base leading-7 text-[#525252]">${escapeHtml(planning)}</p></section><section class="max-w-4xl border-t border-[#E5E7EB] py-8"><h2 class="text-2xl font-extrabold text-[#171717]">Related TrustyYellowCabs pages</h2><ul class="mt-4 grid gap-3 sm:grid-cols-2">${relatedMarkup}</ul></section></div></main>`;
};

const staticJsonLd = (routePath: string, seo: SeoHead) => JSON.stringify(getSiteStructuredData(seo, {
  includeService: !['/about', '/fleet', '/contact', '/book-a-trip', '/booking-confirmed'].includes(routePath),
  faq: routePath === '/taxi-service-in-coimbatore' ? TAXI_SERVICE_FAQ : undefined,
}));

const staticSeoPlugin = () => ({
  name: 'generate-static-seo-route-heads',
  apply: 'build' as const,
  closeBundle() {
    const distIndex = path.resolve(__dirname, 'dist/index.html');
    const template = fs.readFileSync(distIndex, 'utf8');
    const writeRoute = (route: string, seo: { title: string; description: string; robots: string; canonical: string }, source: string, includeStaticBody = false) => {
      const routeHead = source
        .replace(/<title[^>]*>.*?<\/title>/s, `<title data-rh="true">${escapeHtml(seo.title)}</title>`)
        .replace(/<meta[^>]*name="description"[^>]*>/, `<meta data-rh="true" name="description" content="${escapeHtml(seo.description)}">`)
        .replace(/<meta[^>]*name="robots"[^>]*>/, `<meta data-rh="true" name="robots" content="${seo.robots}">`)
        .replace(/<link[^>]*rel="canonical"[^>]*>/, `<link data-rh="true" rel="canonical" href="${seo.canonical}">`)
        .replace(/<meta[^>]*property="og:site_name"[^>]*>/, `<meta data-rh="true" property="og:site_name" content="TrustyYellowCabs">`)
        .replace(/<meta[^>]*property="og:title"[^>]*>/, `<meta data-rh="true" property="og:title" content="${escapeHtml(seo.title)}">`)
        .replace(/<meta[^>]*property="og:description"[^>]*>/, `<meta data-rh="true" property="og:description" content="${escapeHtml(seo.description)}">`)
        .replace(/<meta[^>]*property="og:url"[^>]*>/, `<meta data-rh="true" property="og:url" content="${seo.canonical}">`)
        .replace(/<meta[^>]*name="twitter:title"[^>]*>/, `<meta data-rh="true" name="twitter:title" content="${escapeHtml(seo.title)}">`)
        .replace(/<meta[^>]*name="twitter:description"[^>]*>/, `<meta data-rh="true" name="twitter:description" content="${escapeHtml(seo.description)}">`)
        .replace(/<script id="seo-jsonld" type="application\/ld\+json">.*?<\/script>/s, `<script id="seo-jsonld" type="application/ld+json">${staticJsonLd(route ? `/${route}` : '/', seo)}</script>`)
        .replace('<div id="root"></div>', `${includeStaticBody ? staticSeoBody(route ? `/${route}` : '/', seo) : ''}<div id="root"></div>`);
      const routeDir = route ? path.resolve(__dirname, 'dist', route) : path.resolve(__dirname, 'dist');
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), routeHead);
    };

    writeRoute('', rootSeoHead, template, true);
    for (const [route, seo] of Object.entries(seoRouteHeads)) {
      writeRoute(route, seo, template, seo.robots === 'index, follow');
    }
  },
});

const localCurrentTimePlugin = () => ({
  name: 'local-current-time-api',
  configureServer(server: any) {
    server.middlewares.use('/api/current-time', (req: any, res: any) => {
      if (req.method !== 'GET') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      res.statusCode = 200;
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ timestamp: Date.now() }));
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    plugins: [localCurrentTimePlugin(), staticSeoPlugin(), tailwindcss(), react()],

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
