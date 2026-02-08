import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Contact: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);

  const handleWhatsAppClick = () => {
    const text = `Hi Trustyyellowcabs, I have an inquiry about your taxi services in Coimbatore.`;
    const phoneNumber = '918870088020';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Trusty Yellow Cabs for 24/7 safe and reliable taxi services in Coimbatore, Tamil Nadu.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Contact Information</h3>
                <div className="space-y-8">
                  <a href="tel:+918870088020" className="flex items-start gap-6 group">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-lg">Phone</p>
                      <p className="text-slate-600 dark:text-slate-400 group-hover:text-yellow-600 transition-colors font-medium">+91 88700 88020</p>
                    </div>
                  </a>
                  <a href="mailto:trustyyellowcabs@gmail.com" className="flex items-start gap-6 group">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-lg">Email</p>
                      <p className="text-slate-600 dark:text-slate-400 group-hover:text-yellow-600 transition-colors font-medium">trustyyellowcabs@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-6">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl text-yellow-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-lg">Address</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Trustyyellowcabs Taxi services<br />
                        Sundapalayam, Coimbatore, Tamil Nadu 641007
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 mt-12">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44163071375!2d76.88483286780826!3d11.014203302096378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c817186f121b!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709555000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Coimbatore Map"
                  className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Quick Connect / WhatsApp */}
          <div className="flex flex-col justify-center bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border-2 border-dashed border-yellow-200 dark:border-yellow-800/50 text-center shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 animate-pulse-slow">
               <MessageCircle size={48} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Direct WhatsApp Booking</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-md mx-auto">
              Reach us anytime for Coimbatore taxi bookings, outstation trips, and corporate travel.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-5 rounded-full flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-green-500/25 text-xl"
              >
                <MessageCircle size={24} />
                Message on WhatsApp
              </button>
              
              <a 
                href="tel:+918870088020"
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-5 rounded-full flex items-center justify-center gap-3 transition-all text-xl"
              >
                <Phone size={24} />
                Call Directly
              </a>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-10 text-left">
              <button
                onClick={() => setShowTerms(!showTerms)}
                className="flex items-center justify-between w-full text-slate-900 dark:text-white font-semibold text-lg bg-slate-100 dark:bg-slate-800 p-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <span>Terms and Conditions</span>
                {showTerms ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {showTerms && (
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2">
                     <p>1. All taxi bookings are subject to availability.</p>
    <p>2. Customers must provide accurate pickup and drop location details.</p>
    <p>3. Payments can be made in cash or via approved digital payment methods.</p>
    <p>4. Trustyyellowcabs is not responsible for delays due to traffic, weather, or unforeseen circumstances.</p>
    <p>5. Cancellation policies apply; cancellation fees are applicable. Please refer to our cancellation terms when booking.</p>
    <p>6. By using our services, you agree to follow all applicable local regulations.</p>
    <p>7. One day is equal to one calendar day (from midnight to midnight).</p>
    <p>8. Parking, toll, and interstate permit charges are extra.</p>
    <p>9. Driver allowance will be extra if the driver drives between 10:00 PM to 6:00 AM.</p>
    <p>10. Total km and time calculation is from office to office.</p>
    <p>11. AC will not work in hill areas (upwards) and stopped/parked vehicles.</p>
    <p>12. If km usage exceeds standard limits, tariff shifts automatically to Day/KM Basis.</p>
     <p>13. Bookings made via online ads (e.g., Google Ads) may appear when searching for other brands. Trustyyellowcabs is only responsible for bookings actually made with us. Customers cannot claim services from other brands using our ad links.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
