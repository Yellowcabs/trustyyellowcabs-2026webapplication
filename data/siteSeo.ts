export const SITE_URL = 'https://www.trustyyellowcabs.in';
export const SITE_NAME = 'TrustyYellowCabs';
export const SITE_PHONE = '+918870088020';
export const SITE_EMAIL = 'trustyyellowcabs@gmail.com';
export const SITE_LOGO_URL = `${SITE_URL}/images/taxi-icon-512.png`;

export const SITE_ADDRESS = {
  streetAddress: 'Trustyyellowcabs Taxi Services, Sundapalayam',
  addressLocality: 'Coimbatore',
  addressRegion: 'Tamil Nadu',
  postalCode: '641007',
  addressCountry: 'IN',
} as const;

export type SeoHead = {
  title: string;
  description: string;
  robots: string;
  canonical: string;
};

export const CORE_SEO_ROUTES: Record<string, SeoHead> = {
  '/': {
    title: 'Coimbatore Taxi Service & Cab Booking | TrustyYellowCabs',
    description: 'TrustyYellowCabs provides taxi service in Coimbatore for city rides, airport transfers, outstation trips, and hourly rentals.',
    robots: 'index, follow',
    canonical: `${SITE_URL}/`,
  },
  '/about': {
    title: 'About TrustyYellowCabs | Coimbatore Taxi Service',
    description: 'Learn about TrustyYellowCabs and its taxi services for city travel, airport transfers, and outstation journeys in Coimbatore.',
    robots: 'index, follow',
    canonical: `${SITE_URL}/about`,
  },
  '/fleet': {
    title: 'Taxi Fleet in Coimbatore | TrustyYellowCabs',
    description: 'Explore the TrustyYellowCabs fleet for local taxi rides, airport travel, rentals, and outstation journeys in Coimbatore.',
    robots: 'index, follow',
    canonical: `${SITE_URL}/fleet`,
  },
  '/services': {
    title: 'Taxi Services in Coimbatore | TrustyYellowCabs',
    description: 'Choose TrustyYellowCabs for call taxi, airport transfer, hourly rental, and outstation taxi services in Coimbatore.',
    robots: 'index, follow',
    canonical: `${SITE_URL}/services`,
  },
  '/contact': {
    title: 'Contact TrustyYellowCabs | Coimbatore Taxi Booking',
    description: 'Contact TrustyYellowCabs for cab booking, WhatsApp support, and taxi services from Sundapalayam, Coimbatore, Tamil Nadu.',
    robots: 'index, follow',
    canonical: `${SITE_URL}/contact`,
  },
  '/taxi-service-in-coimbatore': {
    title: 'Taxi Service in Coimbatore | TrustyYellowCabs',
    description: 'Book TrustyYellowCabs for city taxi service, airport taxi, outstation travel, and car rental with driver in Coimbatore.',
    robots: 'index, follow',
    canonical: `${SITE_URL}/taxi-service-in-coimbatore`,
  },
  '/book-a-trip': {
    title: 'Book a Taxi in Coimbatore | TrustyYellowCabs',
    description: 'Start a TrustyYellowCabs taxi booking in Coimbatore.',
    robots: 'noindex, nofollow',
    canonical: `${SITE_URL}/book-a-trip`,
  },
  '/booking-confirmed': {
    title: 'Booking Confirmed | TrustyYellowCabs',
    description: 'Your TrustyYellowCabs booking confirmation.',
    robots: 'noindex, nofollow',
    canonical: `${SITE_URL}/booking-confirmed`,
  },
};

export const NOT_FOUND_SEO: SeoHead = {
  title: 'Page Not Found | TrustyYellowCabs',
  description: 'The requested TrustyYellowCabs page could not be found.',
  robots: 'noindex, nofollow',
  canonical: SITE_URL,
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export const TAXI_SERVICE_FAQ: SeoFaqItem[] = [
  {
    question: 'How can I book a TrustyYellowCabs taxi?',
    answer: 'Use the booking form on the home page to enter pickup and destination details, then continue through the mobile, package, vehicle, and confirmation steps.',
  },
  {
    question: 'Which taxi services are available?',
    answer: 'TrustyYellowCabs presents airport transfers, hourly rentals, outstation trips, and corporate travel services in its service catalogue.',
  },
  {
    question: 'How do I contact TrustyYellowCabs?',
    answer: 'Call +91 88700 88020 or use the Contact page for direct phone, email, and WhatsApp support.',
  },
];

export const getSiteStructuredData = (
  seo: SeoHead,
  options: {
    includeService?: boolean;
    faq?: SeoFaqItem[];
    breadcrumbLabel?: string;
  } = {},
) => {
  const organizationId = `${SITE_URL}/#organization`;
  const taxiServiceId = `${SITE_URL}/#taxi-service`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: SITE_LOGO_URL,
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
    },
    {
      '@type': ['LocalBusiness', 'TaxiService'],
      '@id': taxiServiceId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: SITE_LOGO_URL,
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      areaServed: { '@type': 'City', name: 'Coimbatore' },
      address: { '@type': 'PostalAddress', ...SITE_ADDRESS },
      parentOrganization: { '@id': organizationId },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': organizationId },
    },
  ];

  if (options.includeService) {
    graph.push({
      '@type': 'Service',
      '@id': `${seo.canonical}#service`,
      name: 'Taxi service in Coimbatore',
      serviceType: 'Taxi service',
      provider: { '@id': taxiServiceId },
      areaServed: { '@type': 'City', name: 'Coimbatore' },
      description: seo.description,
    });
  }

  if (seo.canonical !== `${SITE_URL}/` && seo.robots === 'index, follow') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: options.breadcrumbLabel || seo.title.split(' | ')[0], item: seo.canonical },
      ],
    });
  }

  if (options.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: options.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};
