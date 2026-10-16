import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Contact: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918870088020', '_blank');
  };

  return (
    <div className="bg-white pb-0 pt-10  sm:pt-12 md:min-h-screen md:py-12 lg:py-16">
      <div className="container mx-auto max-w-[1200px] px-5 md:px-6">
        <header className="mb-10 max-w-3xl text-left sm:mb-12">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FFC107] sm:text-xs">Contact Us</p>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-[#171717]  sm:text-4xl lg:text-5xl">Get in Touch</h1>
          <div className="my-4 h-1 w-14 rounded-full bg-[#FFC107]"></div>
          <p className="text-sm font-medium leading-7 text-[#525252]  sm:text-base">
            TrustyYellowCabs for 24/7 safe and reliable taxi services in Coimbatore, Tamil Nadu.
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-[45fr_55fr] lg:gap-0">
          <section className="lg:border-r lg:border-[#E5E7EB] lg:pr-10 ">
            <h2 className="mb-6 text-2xl font-extrabold text-[#171717] ">Customer Support</h2>
            <div className="border-t border-[#E5E7EB] ">
              <a href="tel:+918870088020" className="group flex items-start gap-4 border-b border-[#E5E7EB] py-5 ">
                <Phone size={18} className="mt-1 shrink-0 text-[#FFC107]" aria-hidden="true" />
                <div>
                  <p className="font-bold text-[#171717] ">Phone</p>
                  <p className="mt-1 text-sm font-medium text-[#525252] transition-colors group-hover:text-[#FFC107] ">+91 88700 88020</p>
                </div>
              </a>

              <a href="mailto:trustyyellowcabs@gmail.com" className="group flex items-start gap-4 border-b border-[#E5E7EB] py-5 ">
                <Mail size={18} className="mt-1 shrink-0 text-[#FFC107]" aria-hidden="true" />
                <div>
                  <p className="font-bold text-[#171717] ">Email</p>
                  <p className="mt-1 break-all text-sm font-medium text-[#525252] transition-colors group-hover:text-[#FFC107] ">trustyyellowcabs@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 border-b border-[#E5E7EB] py-5 ">
                <MapPin size={18} className="mt-1 shrink-0 text-[#FFC107]" aria-hidden="true" />
                <div>
                  <p className="font-bold text-[#171717] ">Address</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#525252] ">
                    Trustyyellowcabs Taxi Services <br />
                    Sundapalayam, Coimbatore, <br />
                    Tamil Nadu – 641007
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:pl-10">
            <h2 className="mb-4 text-2xl font-extrabold text-[#171717] ">Direct WhatsApp Booking</h2>
            <p className="mb-7 text-sm font-medium leading-7 text-[#525252]  sm:text-base">
              Reach out 24/7 for instant taxi booking including outstation and business travel in Coimbatore.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#25D366] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1DA851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Message on WhatsApp
              </button>

              <a
                href="tel:+918870088020"
                className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#FFFDF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4    "
              >
                <Phone size={18} aria-hidden="true" />
                Call Directly
              </a>
            </div>
          </section>
        </div>

        <section className="mt-10 sm:mt-12">
          <div className="h-[240px] w-full overflow-hidden rounded-xl border border-[#E5E7EB] bg-white   md:h-[300px] md:rounded-2xl lg:h-[350px]">
            <iframe
              src="https://www.google.com/maps?q=Coimbatore%2C+Tamil+Nadu&output=embed&z=11"
              className="h-full w-full"
              loading="lazy"
              title="TrustyYellowCabs Map"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="mt-8 border-b border-[#E5E7EB]  sm:mt-10">
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="flex w-full items-center justify-between py-5 text-left text-base font-bold text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]  sm:text-lg"
            aria-expanded={showTerms}
          >
            <span>Terms and Conditions</span>
            {showTerms ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showTerms && (
            <div className="space-y-2 border-t border-[#E5E7EB] py-5 text-sm leading-6 text-[#525252]  ">
              <p>1. All taxi bookings are subject to availability.</p>
              <p>2. Customers must provide accurate pickup and drop location details.</p>
              <p>3. Payments can be made in cash or via approved digital payment methods.</p>
              <p>4. TrustyYellowCabs is not responsible for delays due to traffic, weather, or unforeseen circumstances.</p>
              <p>5. Cancellation policies apply; cancellation fees are applicable. Please refer to our cancellation terms when booking.</p>
              <p>6. By using our services, you agree to follow all applicable local regulations.</p>
              <p>7. One day is equal to one calendar day (from midnight to midnight).</p>
              <p>8. Parking, toll, and interstate permit charges are extra.</p>
              <p>9. Driver allowance will be extra if the driver drives between 10:00 PM to 6:00 AM.</p>
              <p>10. Total km and time calculation is from office to office.
                Fare shown during booking is an estimate only. Final fare will be based on actual distance traveled and applicable tariff.
              </p>
              <p>11. AC will not work in hill areas (upwards) and stopped/parked vehicles.</p>
              <p>12. If km usage exceeds standard limits, tariff shifts automatically to Day/KM Basis.</p>
              <p>13. Bookings made via online ads (e.g., Google Ads) may appear when searching for other brands. TrustyYellowCabs is only responsible for bookings actually made with us. Customers cannot claim services from other brands using our ad links.</p>
              <p>14. Our website and booking page may appear in search results when customers search for other taxi brand names. By clicking our advertisement, website link, WhatsApp, or call button, the customer acknowledges that they are contacting our company directly, not any other brand.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
