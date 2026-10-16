
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white pt-10 pb-24 md:pb-6 border-t border-[#E5E7EB] transition-colors duration-300">
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          
          <Link to="/" className="flex items-center gap-0 group" aria-label="TrustyYellowCabs">
             <span className="text-xl font-extrabold tracking-tight text-[#171717] group-hover:text-[#FFB300] transition-colors">
               Trusty
             </span>
             <span className="text-xl font-extrabold tracking-tight text-[#FFC107] transition-colors">
               Yellow Cabs
             </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-6">
            {['Home', 'About', 'Fleet', 'Services', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                className="text-sm font-medium text-[#525252] hover:text-[#FFB300] transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block w-[120px]"></div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-[#E5E7EB] pt-8 text-sm text-[#525252] md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="font-bold text-[#171717]">TrustyYellowCabs</h2>
            <p className="mt-2 max-w-md leading-6">
              Safe and reliable taxi services in Coimbatore for local rides, airport transfers, outstation trips, and hourly rentals.
            </p>
          </div>

          <div>
            <p className="font-bold text-[#171717]">Contact</p>
            <div className="mt-2 space-y-1 leading-6">
              <a href="tel:+918870088020" className="block hover:text-[#FFB300] transition-colors">+91 88700 88020</a>
              <a href="https://wa.me/918870088020" target="_blank" rel="noopener noreferrer" className="block hover:text-[#FFB300] transition-colors">WhatsApp: +91 88700 88020</a>
              <a href="mailto:trustyyellowcabs@gmail.com" className="block break-all hover:text-[#FFB300] transition-colors">trustyyellowcabs@gmail.com</a>
            </div>
          </div>

          <div>
            <p className="font-bold text-[#171717]">Address</p>
            <p className="mt-2 leading-6">
              Trustyyellowcabs Taxi Services, Sundapalayam, Coimbatore, Tamil Nadu – 641007
            </p>
          </div>
        </div>

        <div className="mt-8 mb-6 h-px w-full bg-slate-100" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#525252]">
          <p>&copy; 2026 TrustyYellowCabs. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
             <a 
               href="https://www.fastpointcab.in/"
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-[#FFB300] transition-colors font-medium flex items-center gap-1"
             >
               Our Partner – FastPointCab
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
