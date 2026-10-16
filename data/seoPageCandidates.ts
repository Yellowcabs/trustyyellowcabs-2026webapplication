import { CORE_SEO_ROUTES, SITE_NAME } from './siteSeo';

export type SeoPageCategory =
  | 'existing'
  | 'coimbatore-service'
  | 'area'
  | 'airport-route'
  | 'outstation-route'
  | 'vehicle-rental';

export type SeoPageStatus = 'published' | 'draft';

export interface SeoPageCandidate {
  path: string;
  category: SeoPageCategory;
  label: string;
  title: string;
  description: string;
  heading: string;
  status: SeoPageStatus;
  indexable: boolean;
  draftReason?: string;
}

const published = (
  path: string,
  label: string,
  title: string,
  description: string,
  heading: string,
): SeoPageCandidate => ({
  path,
  category: 'existing',
  label,
  title,
  description,
  heading,
  status: 'published',
  indexable: true,
});

const draft = (
  category: Exclude<SeoPageCategory, 'existing'>,
  path: string,
  label: string,
  focus: string,
): SeoPageCandidate => ({
  path,
  category,
  label,
  title: `${label} | ${SITE_NAME}`,
  description: `Plan ${label.toLowerCase()} with ${SITE_NAME} in Coimbatore. Review booking guidance and trip details for ${focus}.`,
  heading: label,
  status: 'draft',
  indexable: false,
  draftReason: 'Needs confirmation of service coverage and page-specific operational details before publication.',
});

const existingPages: SeoPageCandidate[] = [
  published('/', 'Home', CORE_SEO_ROUTES['/'].title, CORE_SEO_ROUTES['/'].description, 'Taxi Service in Coimbatore'),
  published('/about', 'About TrustyYellowCabs', CORE_SEO_ROUTES['/about'].title, CORE_SEO_ROUTES['/about'].description, 'About TrustyYellowCabs'),
  published('/fleet', 'Taxi Fleet', CORE_SEO_ROUTES['/fleet'].title, CORE_SEO_ROUTES['/fleet'].description, 'Taxi Fleet in Coimbatore'),
  published('/services', 'Taxi Services', CORE_SEO_ROUTES['/services'].title, CORE_SEO_ROUTES['/services'].description, 'Taxi Services in Coimbatore'),
  published('/contact', 'Contact TrustyYellowCabs', CORE_SEO_ROUTES['/contact'].title, CORE_SEO_ROUTES['/contact'].description, 'Contact TrustyYellowCabs'),
  published('/taxi-service-in-coimbatore', 'Taxi Service in Coimbatore', CORE_SEO_ROUTES['/taxi-service-in-coimbatore'].title, CORE_SEO_ROUTES['/taxi-service-in-coimbatore'].description, 'Taxi Service in Coimbatore'),
];

const coimbatoreServicePages = [
  ['call-taxi-coimbatore', 'Call Taxi Coimbatore'],
  ['cab-booking-coimbatore', 'Cab Booking Coimbatore'],
  ['local-taxi-coimbatore', 'Local Taxi Coimbatore'],
  ['airport-taxi-coimbatore', 'Airport Taxi Coimbatore'],
  ['outstation-taxi-coimbatore', 'Outstation Taxi Coimbatore'],
  ['one-way-taxi-coimbatore', 'One Way Taxi Coimbatore'],
  ['round-trip-taxi-coimbatore', 'Round Trip Taxi Coimbatore'],
  ['hourly-taxi-rental-coimbatore', 'Hourly Taxi Rental Coimbatore'],
  ['24-hours-taxi-service-coimbatore', '24 Hours Taxi Service Coimbatore'],
  ['corporate-taxi-coimbatore', 'Corporate Taxi Coimbatore'],
  ['railway-station-taxi-coimbatore', 'Railway Station Taxi Coimbatore'],
  ['family-taxi-coimbatore', 'Family Taxi Coimbatore'],
  ['seven-seater-taxi-coimbatore', 'Seven Seater Taxi Coimbatore'],
  ['tempo-traveller-coimbatore', 'Tempo Traveller Coimbatore'],
  ['taxi-near-me-coimbatore', 'Taxi Near Me Coimbatore'],
  ['city-to-city-taxi-coimbatore', 'City to City Taxi Coimbatore'],
  ['business-travel-taxi-coimbatore', 'Business Travel Taxi Coimbatore'],
  ['night-taxi-coimbatore', 'Night Taxi Coimbatore'],
  ['wedding-car-rental-coimbatore', 'Wedding Car Rental Coimbatore'],
  ['group-taxi-coimbatore', 'Group Taxi Coimbatore'],
] as const;

/* const areaPagesDraft = [
  ['gandhipuram', 'Gandhipuram Taxi Service'],
  ['rs-puram', 'RS Puram Taxi Service'],
  ['peelamedu', 'Peelamedu Taxi Service'],
  ['singanallur', 'Singanallur Taxi Service'],
  ['saravanampatti', 'Saravanampatti Taxi Service'],
  ['ganapathy', 'Ganapathy Taxi Service'],
  ['saibaba-colony', 'Saibaba Colony Taxi Service'],
  ['race-course', 'Race Course Taxi Service'],
  ['ukkadam', 'Ukkadam Taxi Service'],
  ['town-hall', 'Town Hall Taxi Service'],
  ['ramanathapuram', 'Ramanathapuram Taxi Service'],
  ['hope-college', 'Hope College Taxi Service'],
  ['kalapatti', 'Kalapatti Taxi Service'],
  ['vilankurichi', 'Vilankurichi Taxi Service'],
  ['thudiyalur', 'Thudiyalur Taxi Service'],
  ['kovaipudur', 'Kovaipudur Taxi Service'],
  ['kuniyamuthur', 'Kuniyamuthur Taxi Service'],
  ['sundarapuram', 'Sundarapuram Taxi Service'],
  ['podanur', 'Podanur Taxi Service'],
  ['ondipudur', 'Ondipudur Taxi Service'],
  ['neelambur', 'Neelambur Taxi Service'],
  ['sulur', 'Sulur Taxi Service'],
  ['vadavalli', 'Vadavalli Taxi Service'],
  ['veerakeralam', 'Veerakeralam Taxi Service'],
  ['koundampalayam', 'Koundampalayam Taxi Service'],
  ['selvapuram', 'Selvapuram Taxi Service'],
  ['perur', 'Perur Taxi Service'],
  ['chinniyampalayam', 'Chinniyampalayam Taxi Service'],
  ['avaram-p​​alayam', 'Avarampalayam Taxi Service'],
  ['nanjundapuram', 'Nanjundapuram Taxi Service'],
  ['sivanandha-colony', 'Sivanandha Colony Taxi Service'],
  ['puliakulam', 'Puliakulam Taxi Service'],
  ['sitra', 'Sitra Taxi Service'],
  ['marudamalai', 'Marudamalai Taxi Service'],
  ['sundakkamuthur', 'Sundakkamuthur Taxi Service'],
] as const; */

const areaPages = [
  ['gandhipuram', 'Gandhipuram Taxi Service'],
  ['rs-puram', 'RS Puram Taxi Service'],
  ['peelamedu', 'Peelamedu Taxi Service'],
  ['singanallur', 'Singanallur Taxi Service'],
  ['saravanampatti', 'Saravanampatti Taxi Service'],
  ['ganapathy', 'Ganapathy Taxi Service'],
  ['saibaba-colony', 'Saibaba Colony Taxi Service'],
  ['race-course', 'Race Course Taxi Service'],
  ['ukkadam', 'Ukkadam Taxi Service'],
  ['town-hall', 'Town Hall Taxi Service'],
  ['ramanathapuram', 'Ramanathapuram Taxi Service'],
  ['hope-college', 'Hope College Taxi Service'],
  ['kalapatti', 'Kalapatti Taxi Service'],
  ['vilankurichi', 'Vilankurichi Taxi Service'],
  ['thudiyalur', 'Thudiyalur Taxi Service'],
  ['kovaipudur', 'Kovaipudur Taxi Service'],
  ['kuniyamuthur', 'Kuniyamuthur Taxi Service'],
  ['sundarapuram', 'Sundarapuram Taxi Service'],
  ['podanur', 'Podanur Taxi Service'],
  ['ondipudur', 'Ondipudur Taxi Service'],
  ['neelambur', 'Neelambur Taxi Service'],
  ['sulur', 'Sulur Taxi Service'],
  ['vadavalli', 'Vadavalli Taxi Service'],
  ['veerakeralam', 'Veerakeralam Taxi Service'],
  ['koundampalayam', 'Koundampalayam Taxi Service'],
  ['selvapuram', 'Selvapuram Taxi Service'],
  ['perur', 'Perur Taxi Service'],
  ['chinniyampalayam', 'Chinniyampalayam Taxi Service'],
  ['avaram-palayam', 'Avarampalayam Taxi Service'],
  ['nanjundapuram', 'Nanjundapuram Taxi Service'],
  ['sivanandha-colony', 'Sivanandha Colony Taxi Service'],
  ['puliakulam', 'Puliakulam Taxi Service'],
  ['sitra', 'Sitra Taxi Service'],
  ['marudamalai', 'Marudamalai Taxi Service'],
  ['sundakkamuthur', 'Sundakkamuthur Taxi Service'],
] as const;

const airportRoutePages = [
  ['coimbatore-airport-to-gandhipuram-taxi', 'Coimbatore Airport to Gandhipuram Taxi'],
  ['coimbatore-airport-to-rs-puram-taxi', 'Coimbatore Airport to RS Puram Taxi'],
  ['coimbatore-airport-to-peelamedu-taxi', 'Coimbatore Airport to Peelamedu Taxi'],
  ['coimbatore-airport-to-singanallur-taxi', 'Coimbatore Airport to Singanallur Taxi'],
  ['coimbatore-airport-to-saravanampatti-taxi', 'Coimbatore Airport to Saravanampatti Taxi'],
  ['coimbatore-airport-to-ganapathy-taxi', 'Coimbatore Airport to Ganapathy Taxi'],
  ['coimbatore-airport-to-saibaba-colony-taxi', 'Coimbatore Airport to Saibaba Colony Taxi'],
  ['coimbatore-airport-to-race-course-taxi', 'Coimbatore Airport to Race Course Taxi'],
  ['coimbatore-airport-to-ukkadam-taxi', 'Coimbatore Airport to Ukkadam Taxi'],
  ['coimbatore-airport-to-pollachi-taxi', 'Coimbatore Airport to Pollachi Taxi'],
  ['coimbatore-airport-to-mettupalayam-taxi', 'Coimbatore Airport to Mettupalayam Taxi'],
  ['coimbatore-airport-to-tiruppur-taxi', 'Coimbatore Airport to Tiruppur Taxi'],
  ['coimbatore-airport-to-ooty-taxi', 'Coimbatore Airport to Ooty Taxi'],
  ['coimbatore-airport-to-palakkad-taxi', 'Coimbatore Airport to Palakkad Taxi'],
  ['coimbatore-airport-drop-taxi-service', 'Coimbatore Airport Drop Taxi Service'],
] as const;

const outstationRoutePages = [
  ['coimbatore-to-ooty-taxi', 'Coimbatore to Ooty Taxi'],
  ['coimbatore-to-munnar-taxi', 'Coimbatore to Munnar Taxi'],
  ['coimbatore-to-kodaikanal-taxi', 'Coimbatore to Kodaikanal Taxi'],
  ['coimbatore-to-pollachi-taxi', 'Coimbatore to Pollachi Taxi'],
  ['coimbatore-to-valparai-taxi', 'Coimbatore to Valparai Taxi'],
  ['coimbatore-to-palakkad-taxi', 'Coimbatore to Palakkad Taxi'],
  ['coimbatore-to-kochi-taxi', 'Coimbatore to Kochi Taxi'],
  ['coimbatore-to-bangalore-taxi', 'Coimbatore to Bangalore Taxi'],
  ['coimbatore-to-chennai-taxi', 'Coimbatore to Chennai Taxi'],
  ['coimbatore-to-madurai-taxi', 'Coimbatore to Madurai Taxi'],
  ['coimbatore-to-salem-taxi', 'Coimbatore to Salem Taxi'],
  ['coimbatore-to-erode-taxi', 'Coimbatore to Erode Taxi'],
  ['coimbatore-to-tiruppur-taxi', 'Coimbatore to Tiruppur Taxi'],
  ['coimbatore-to-mysore-taxi', 'Coimbatore to Mysore Taxi'],
  ['coimbatore-to-coonoor-taxi', 'Coimbatore to Coonoor Taxi'],
  ['coimbatore-to-trichy-taxi', 'Coimbatore to Trichy Taxi'],
  ['coimbatore-to-rameswaram-taxi', 'Coimbatore to Rameswaram Taxi'],
  ['coimbatore-to-thanjavur-taxi', 'Coimbatore to Thanjavur Taxi'],
  ['coimbatore-to-yercaud-taxi', 'Coimbatore to Yercaud Taxi'],
  ['coimbatore-to-kumbakonam-taxi', 'Coimbatore to Kumbakonam Taxi'],
  ['coimbatore-to-dindigul-taxi', 'Coimbatore to Dindigul Taxi'],
  ['coimbatore-to-wayanad-taxi', 'Coimbatore to Wayanad Taxi'],
  ['coimbatore-to-kozhikode-taxi', 'Coimbatore to Kozhikode Taxi'],
  ['coimbatore-to-thrissur-taxi', 'Coimbatore to Thrissur Taxi'],
  ['coimbatore-to-tiruchengode-taxi', 'Coimbatore to Tiruchengode Taxi'],
] as const;

const vehicleRentalPages = [
  ['mini-taxi-coimbatore', 'Mini Taxi Coimbatore'],
  ['sedan-taxi-coimbatore', 'Sedan Taxi Coimbatore'],
  ['suv-taxi-coimbatore', 'SUV Taxi Coimbatore'],
  ['innova-taxi-coimbatore', 'Innova Taxi Coimbatore'],
  ['tempo-traveller-rental-coimbatore', 'Tempo Traveller Rental Coimbatore'],
  ['tourist-bus-rental-coimbatore', 'Tourist Bus Rental Coimbatore'],
  ['custom-vehicle-booking-coimbatore', 'Custom Vehicle Booking Coimbatore'],
  ['mini-bus-rental-coimbatore', 'Mini Bus Rental Coimbatore'],
  ['force-urbania-rental-coimbatore', 'Force Urbania Rental Coimbatore'],
  ['local-cab-rental-coimbatore', 'Local Cab Rental Coimbatore'],
  ['full-day-cab-rental-coimbatore', 'Full Day Cab Rental Coimbatore'],
  ['half-day-cab-rental-coimbatore', 'Half Day Cab Rental Coimbatore'],
  ['corporate-car-rental-coimbatore', 'Corporate Car Rental Coimbatore'],
  ['airport-car-rental-coimbatore', 'Airport Car Rental Coimbatore'],
  ['one-way-cab-rental-coimbatore', 'One Way Cab Rental Coimbatore'],
  ['round-trip-cab-rental-coimbatore', 'Round Trip Cab Rental Coimbatore'],
  ['group-vehicle-rental-coimbatore', 'Group Vehicle Rental Coimbatore'],
  ['family-car-rental-coimbatore', 'Family Car Rental Coimbatore'],
  ['hourly-cab-rental-coimbatore', 'Hourly Cab Rental Coimbatore'],
] as const;

export const SEO_PAGE_CANDIDATES: SeoPageCandidate[] = [
  ...existingPages,
  ...coimbatoreServicePages.map(([slug, label]) => draft('coimbatore-service', `/${slug}`, label, 'Coimbatore')),
  ...areaPages.map(([slug, label]) => draft('area', `/taxi-${slug}`, label, `${label.replace(' Taxi Service', '')}, Coimbatore`)),
  ...airportRoutePages.map(([slug, label]) => draft('airport-route', `/${slug}`, label, 'Coimbatore International Airport')),
  ...outstationRoutePages.map(([slug, label]) => draft('outstation-route', `/${slug}`, label, 'Coimbatore and the named destination')),
  ...vehicleRentalPages.map(([slug, label]) => draft('vehicle-rental', `/${slug}`, label, `${SITE_NAME} vehicle and rental services`)),
];

const firstBatchPaths = new Set([
  '/call-taxi-coimbatore',
  '/cab-booking-coimbatore',
  '/local-taxi-coimbatore',
  '/airport-taxi-coimbatore',
  '/outstation-taxi-coimbatore',
  '/one-way-taxi-coimbatore',
  '/round-trip-taxi-coimbatore',
  '/hourly-taxi-rental-coimbatore',
  '/24-hours-taxi-service-coimbatore',
  '/corporate-taxi-coimbatore',
  '/taxi-gandhipuram',
  '/taxi-peelamedu',
  '/taxi-saravanampatti',
  '/taxi-rs-puram',
  '/taxi-singanallur',
  '/taxi-ganapathy',
  '/taxi-kalapatti',
  '/taxi-ukkadam',
  '/taxi-ramanathapuram',
  '/taxi-neelambur',
]);

const secondBatchPaths = new Set([
  '/railway-station-taxi-coimbatore',
  '/family-taxi-coimbatore',
  '/seven-seater-taxi-coimbatore',
  '/tempo-traveller-coimbatore',
  '/taxi-near-me-coimbatore',
  '/city-to-city-taxi-coimbatore',
  '/business-travel-taxi-coimbatore',
  '/night-taxi-coimbatore',
  '/wedding-car-rental-coimbatore',
  '/group-taxi-coimbatore',
  '/taxi-town-hall',
  '/taxi-hope-college',
  '/taxi-vilankurichi',
  '/taxi-thudiyalur',
  '/taxi-kovaipudur',
  '/taxi-kuniyamuthur',
  '/taxi-sundarapuram',
  '/taxi-podanur',
  '/taxi-ondipudur',
  '/taxi-sulur',
]);

const thirdBatchPaths = new Set([
  '/taxi-veerakeralam',
  '/taxi-koundampalayam',
  '/taxi-selvapuram',
  '/taxi-perur',
  '/taxi-chinniyampalayam',
  '/taxi-avaram-palayam',
  '/taxi-nanjundapuram',
  '/taxi-sivanandha-colony',
  '/taxi-puliakulam',
  '/taxi-sitra',
  '/coimbatore-airport-to-gandhipuram-taxi',
  '/coimbatore-airport-to-rs-puram-taxi',
  '/coimbatore-airport-to-peelamedu-taxi',
  '/coimbatore-airport-to-singanallur-taxi',
  '/coimbatore-airport-to-saravanampatti-taxi',
  '/coimbatore-airport-to-ganapathy-taxi',
  '/coimbatore-airport-to-saibaba-colony-taxi',
  '/coimbatore-airport-to-race-course-taxi',
  '/coimbatore-airport-to-ukkadam-taxi',
  '/coimbatore-airport-to-pollachi-taxi',
]);

const fourthBatchPaths = new Set([
  '/coimbatore-to-ooty-taxi',
  '/coimbatore-to-munnar-taxi',
  '/coimbatore-to-kodaikanal-taxi',
  '/coimbatore-to-pollachi-taxi',
  '/coimbatore-to-valparai-taxi',
  '/coimbatore-to-palakkad-taxi',
  '/coimbatore-to-kochi-taxi',
  '/coimbatore-to-bangalore-taxi',
  '/coimbatore-to-chennai-taxi',
  '/coimbatore-to-madurai-taxi',
  '/coimbatore-to-salem-taxi',
  '/coimbatore-to-erode-taxi',
  '/coimbatore-to-tiruppur-taxi',
  '/coimbatore-to-mysore-taxi',
  '/coimbatore-to-coonoor-taxi',
  '/coimbatore-to-trichy-taxi',
  '/coimbatore-to-rameswaram-taxi',
  '/coimbatore-to-thanjavur-taxi',
  '/coimbatore-to-yercaud-taxi',
  '/coimbatore-to-kumbakonam-taxi',
]);

const finalBatchPaths = new Set([
  '/taxi-saibaba-colony',
  '/taxi-race-course',
  '/taxi-vadavalli',
  '/taxi-marudamalai',
  '/taxi-sundakkamuthur',
  '/coimbatore-airport-to-mettupalayam-taxi',
  '/coimbatore-airport-to-tiruppur-taxi',
  '/coimbatore-airport-to-ooty-taxi',
  '/coimbatore-airport-to-palakkad-taxi',
  '/coimbatore-airport-drop-taxi-service',
  '/coimbatore-to-dindigul-taxi',
  '/coimbatore-to-wayanad-taxi',
  '/coimbatore-to-kozhikode-taxi',
  '/coimbatore-to-thrissur-taxi',
  '/coimbatore-to-tiruchengode-taxi',
  '/mini-taxi-coimbatore',
  '/sedan-taxi-coimbatore',
  '/suv-taxi-coimbatore',
  '/innova-taxi-coimbatore',
  '/tempo-traveller-rental-coimbatore',
  '/tourist-bus-rental-coimbatore',
  '/custom-vehicle-booking-coimbatore',
  '/mini-bus-rental-coimbatore',
  '/force-urbania-rental-coimbatore',
  '/local-cab-rental-coimbatore',
  '/full-day-cab-rental-coimbatore',
  '/half-day-cab-rental-coimbatore',
  '/corporate-car-rental-coimbatore',
  '/airport-car-rental-coimbatore',
  '/one-way-cab-rental-coimbatore',
  '/round-trip-cab-rental-coimbatore',
  '/group-vehicle-rental-coimbatore',
  '/family-car-rental-coimbatore',
  '/hourly-cab-rental-coimbatore',
]);

for (const page of SEO_PAGE_CANDIDATES) {
  if (firstBatchPaths.has(page.path) || secondBatchPaths.has(page.path) || thirdBatchPaths.has(page.path) || fourthBatchPaths.has(page.path) || finalBatchPaths.has(page.path)) {
    page.status = 'published';
    page.indexable = true;
    delete page.draftReason;
  }
}

export const PUBLISHED_SEO_PAGES = SEO_PAGE_CANDIDATES.filter((page) => page.status === 'published' && page.indexable);
export const DRAFT_SEO_PAGES = SEO_PAGE_CANDIDATES.filter((page) => page.status === 'draft');
