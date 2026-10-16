import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { FLEET_DATA, SERVICES_DATA } from '../constants';

export const TaxiServiceCoimbatore: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-14 sm:pb-16 lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
        <header className="max-w-4xl pb-10 pt-10 md:pb-14 md:pt-16">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFC107]">Coimbatore Taxi Booking</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.035em] text-[#171717] md:text-6xl">Taxi Service in Coimbatore</h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#525252] md:text-lg">
            TrustyYellowCabs provides online taxi booking for local Coimbatore rides, airport transfers, hourly rentals, and outstation travel.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/" state={{ scrollToBook: true }} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#171717] transition-colors hover:bg-[#FFB300]">
              Book a Taxi <ArrowRight size={16} />
            </Link>
            <a href="tel:+918870088020" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#171717] transition-colors hover:bg-[#FFFDF5]">
              <Phone size={16} /> Call TrustyYellowCabs
            </a>
          </div>
        </header>

        <section className="border-y border-[#E5E7EB] py-10 md:py-14" aria-labelledby="coimbatore-taxi-services">
          <h2 id="coimbatore-taxi-services" className="text-2xl font-extrabold tracking-tight text-[#171717] md:text-3xl">Taxi services for Coimbatore travel</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {SERVICES_DATA.map((service) => (
              <article key={service.id} className="border-b border-[#E5E7EB] pb-6 last:border-b-0 md:last:border-b md:pb-6">
                <h3 className="text-lg font-extrabold text-[#171717]">{service.title}</h3>
                <p className="mt-2 text-sm font-medium leading-7 text-[#525252]">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-[#525252]"><Check size={15} className="mt-1 shrink-0 text-[#FFC107]" />{feature}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-14" aria-labelledby="vehicle-options">
          <h2 id="vehicle-options" className="text-2xl font-extrabold tracking-tight text-[#171717] md:text-3xl">Vehicles available for taxi booking</h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#525252]">Choose from the existing TrustyYellowCabs fleet for everyday city travel, family trips, group travel, and longer journeys.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FLEET_DATA.map((vehicle) => <div key={vehicle.id} className="border border-[#E5E7EB] p-5"><h3 className="font-extrabold uppercase text-[#171717]">{vehicle.name}</h3><p className="mt-2 text-sm text-[#525252]">{vehicle.capacity} seats · {vehicle.features.join(' · ')}</p></div>)}
          </div>
        </section>

        <section className="border-t border-[#E5E7EB] py-10 md:py-14" aria-labelledby="taxi-faq">
          <h2 id="taxi-faq" className="text-2xl font-extrabold tracking-tight text-[#171717] md:text-3xl">Questions about taxi booking in Coimbatore</h2>
          <div className="mt-6 divide-y divide-slate-200">
            <details className="py-5"><summary className="cursor-pointer font-bold text-[#171717]">How can I book a TrustyYellowCabs taxi?</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#525252]">Use the booking form on the home page to enter pickup and destination details, then continue through the mobile, package, vehicle, and confirmation steps.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-bold text-[#171717]">Which taxi services are available?</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#525252]">TrustyYellowCabs currently presents airport transfers, hourly rentals, outstation trips, and corporate travel services in its service catalogue.</p></details>
            <details className="py-5"><summary className="cursor-pointer font-bold text-[#171717]">How do I contact TrustyYellowCabs?</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#525252]">Call +91 88700 88020 or use the Contact page for direct phone, email, and WhatsApp support.</p></details>
          </div>
        </section>
      </div>
    </div>
  );
};
