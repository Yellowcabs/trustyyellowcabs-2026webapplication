import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LOCATIONS_DATA } from '../locations';
import { MapPin, ArrowRight } from 'lucide-react';

export const Locations: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
      <Helmet>
        <title>Our Service Locations | Trusty Yellow Cabs Coimbatore</title>
        <meta name="description" content="Explore our wide range of service locations in and around Coimbatore. We provide reliable taxi services to over 60 locations including airport, railway station, and outstation destinations." />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Our <span className="text-brand-yellow">Locations</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We provide reliable taxi services across more than 60 key locations in and around Coimbatore. Find your location below and book your ride today.
          </p>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {LOCATIONS_DATA.map((location) => (
            <Link
              key={location.slug}
              to={`/${location.slug}`}
              className="group bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-brand-yellow dark:hover:border-brand-yellow transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-white dark:bg-slate-950 rounded-lg flex items-center justify-center text-brand-yellow mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <ArrowRight size={16} className="text-slate-300 dark:text-slate-700 group-hover:text-brand-yellow transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-yellow transition-colors">
                {location.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                {location.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
