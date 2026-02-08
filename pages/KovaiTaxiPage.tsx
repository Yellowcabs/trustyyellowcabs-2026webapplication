import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';

interface Service {
  title: string;
  desc: string;
}

const KovaiTaxiPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Kovai Taxi Service | 24/7 Taxi Booking in Coimbatore';
    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute(
        'content',
        'Book a reliable taxi in Kovai (Coimbatore) with clean cars, professional drivers, and on-time pickup. City, airport & outstation rides available 24/7.'
      );
    }
  }, []);

  const services: Service[] = [
    { title: 'City Rides', desc: 'Quick and comfortable travel across Coimbatore.' },
    { title: 'Airport Transfers', desc: 'On-time pickup & drop to Coimbatore International Airport.' },
    { title: 'Outstation Trips', desc: 'Safe long-distance journeys from Kovai.' },
    { title: 'Hourly Rentals', desc: 'Flexible bookings for meetings and shopping.' },
    { title: 'Corporate Travel', desc: 'Professional transport for business needs.' },
    { title: 'Tour Packages', desc: 'Explore nearby places with trusted drivers.' },
  ];

  const quickLinks = [
    // Coimbatore Specific Keywords
    'Coimbatore to Ooty', 'Coimbatore to Coonoor', 'Coimbatore to Kodaikanal', 'Coimbatore to Munnar',
    'Coimbatore to Palani', 'Coimbatore to Valparai', 'Coimbatore to Mysore', 'Coimbatore to Bangalore',
    'Coimbatore to Chennai', 'Coimbatore to Madurai', 'Coimbatore to Trichy', 'Coimbatore to Salem',
    'Coimbatore to Thrissur', 'Coimbatore to Coorg', 'Coimbatore to Wayanad', 'Coimbatore to Guruvayur',
    'Coimbatore to Puducherry', 'Coimbatore to Rameshwaram', 'Coimbatore to Kanyakumari', 'Coimbatore to Tirupur',
    'Coimbatore to Erode', 'Coimbatore to Dindigul', 'Coimbatore to Karur', 'Coimbatore to Pollachi',
    'Coimbatore to Namakkal', 'Coimbatore to Thanjavur', 'Coimbatore to Tirunelveli', 'Coimbatore to Nagercoil',

    // General Taxi Keywords
    'taxi service near me', 'taxi booking', 'outstation cab booking', 'taxi car', 'call taxi near me',
    'taxi in coimbatore', 'cab service', 'taxi near me', 'call taxi', 'taxi service', 'airport taxi',
    'cab booking', 'ola cab booking', 'uber taxi', 'go taxi coimbatore', 'taxi cab', 'cab service near me',
    'cab booking coimbatore',

    // Main City Areas
    'Coimbatore Taxi', 'Gandhipuram Taxi', 'RS Puram Taxi', 'Peelamedu Taxi', 'Avinashi Road Taxi',
    'Saibaba Colony Taxi', 'Eachanari Taxi', 'Singanallur Taxi', 'Tidel Park Coimbatore Taxi',
    'Civic Centre Coimbatore Taxi', 'Town Hall Coimbatore Taxi', 'Hope College Road Taxi', 'Lakshmi Mills Taxi',
    'Ondipudur Taxi', 'Podanur Taxi', 'Sundarapuram Taxi', 'Ramnagar Coimbatore Taxi', 'Sivananda Colony Taxi',
    'Ukkadam Taxi', 'Vilankurichi Taxi', 'Thudiyalur Taxi', 'Kalapatti Taxi', 'Vadavalli Taxi', 'Saravanampatti Taxi',

    // Airports & Railway Stations
    'Coimbatore Airport Taxi', 'Peelamedu Airport Taxi', 'Coimbatore Railway Station Taxi',
    'Podanur Railway Station Taxi', 'Coimbatore International Airport Taxi',

    // Hospitals & Colleges
    'KG Hospital Taxi', 'PSG Hospital Taxi', 'Ganga Hospital Taxi', 'Government Hospital Coimbatore Taxi',
    'PSG College Taxi', 'SNS College Taxi', 'KG College Coimbatore Taxi', 'Sri Krishna College Taxi',

    // Major Temples & Religious Spots
    'Perur Pateeswarar Temple Taxi', 'Marudamalai Temple Taxi', 'Eachanari Vinayagar Temple Taxi',
    'Dhandayuthapani Temple Taxi', 'Masani Amman Temple Taxi', 'Isha Yoga Center Taxi',
    'Avinashi Temple Taxi', 'Kovai Kondattam Taxi', 'Bhavani Amman Temple Taxi',

    // Tourist & Recreation Spots
    'VOC Park Taxi', 'Brookefields Mall Taxi', 'Gass Forest Museum Taxi', 'Race Course Coimbatore Taxi',
    'Codissia Trade Fair Taxi', 'Siruvani Waterfalls Taxi', 'Valankulam Lake Taxi',
    'Black Thunder Water Park Taxi', 'Perur Lake Taxi', 'Kovai Kutralam Taxi',

    // Industrial & IT Hubs
    'Peelamedu IT Park Taxi', 'Erode Road Industrial Taxi', 'Vellalore Industrial Area Taxi',
    'Saravanampatti IT Hub Taxi', 'Avinashi Road Industrial Taxi',

    // Nearby Hill Stations & Outstation
    'Ooty Taxi from Coimbatore', 'Coonoor Taxi from Coimbatore', 'Kodaikanal Taxi from Coimbatore',
    'Palani Taxi from Coimbatore', 'Valparai Taxi from Coimbatore', 'Munnar Taxi from Coimbatore',

    // Corporate & Special Services
    'Corporate Travel Coimbatore', 'Airport Transfer Coimbatore', 'Hourly Rentals Coimbatore',
    'Luxury Car Hire Coimbatore', 'SUV Taxi Coimbatore', 'Family Taxi Packages Coimbatore',
    'Wedding Taxi Coimbatore', 'One-Way Taxi Coimbatore', 'Round Trip Taxi Coimbatore',
    'Tourist Taxi Services Coimbatore', 'Local Taxi Coimbatore', 'Shopping Taxi Coimbatore',

    // Red Taxi Branding
    'red taxi', 'red taxi coimbatore', 'red taxi number', 'red taxi booking',
  ];

  return (
    <main className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-50 dark:bg-slate-900/40 overflow-hidden py-12 md:py-16 lg:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-5%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-yellow-400/10 rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-slate-50 dark:bg-slate-900/40 rounded-full blur-[100px] animate-float-slow"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-12">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">

            {/* Text Content */}
            <div className="flex-1 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
                Kovai Taxi Service – <span className="text-yellow-400">Nearby Taxi Booking</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-md lg:max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Fast, clean rides with experienced local drivers and on-time pickup for every journey.
              </p>
            </div>

            {/* Booking Form */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-1 md:py-24 bg-gray-50 dark:bg-gray-900/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight text-center">
              Our Kovai Taxi Service
            </h2>
            <div className="w-14 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl md:rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700
                           hover:-translate-y-2 hover:shadow-xl transition-transform duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-yellow-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Quick Links
          </h2>
          <div className="overflow-x-auto">
            <div className="flex gap-4 sm:gap-6 py-2">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to="/"
                  className="flex-shrink-0 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                             font-medium text-sm sm:text-base text-center hover:bg-yellow-100 dark:hover:bg-yellow-600/30
                             hover:text-yellow-500 dark:hover:text-yellow-400 transition duration-300"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold animate-fade-in-up">
            Book Your Taxi in Coimbatore
          </h2>
          <p className="font-medium text-base sm:text-lg md:text-xl lg:text-2xl animate-fade-in-up delay-150">
            Safe rides. Clean cars. On-time pickup.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-8 py-4 rounded-2xl md:rounded-3xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-semibold shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Book a Nearby Taxi
          </Link>
        </div>

        <div className="absolute -top-16 -left-16 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-yellow-200/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-16 -right-16 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-yellow-300/10 rounded-full blur-3xl animate-float-slow"></div>
      </section>
    </main>
  );
};

export default KovaiTaxiPage;
