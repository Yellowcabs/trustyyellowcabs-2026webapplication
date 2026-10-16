
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const skipMenuScrollRestore = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      if (!skipMenuScrollRestore.current) window.scrollTo(0, scrollY);
      skipMenuScrollRestore.current = false;
    };
  }, [isOpen]);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/fleet', label: 'Fleet' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') return;

    event.preventDefault();
    if (isOpen) skipMenuScrollRestore.current = true;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <nav className={`${isOpen ? 'fixed inset-0 z-[100] h-[100dvh] overflow-y-auto bg-white' : 'sticky top-0 z-40 bg-white/95 backdrop-blur-xl'} w-full border-b border-[#FFFDF5] transition-all`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex items-center group gap-0.5">
             <span className="text-xl font-extrabold tracking-tighter text-[#171717] transition-colors">
              Trusty 
             </span>
             <span className="text-xl font-extrabold tracking-tighter text-brand-yellow transition-colors">
              Yellow Cabs
             </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={link.path === '/' ? handleHomeClick : undefined}
                className={`text-[11px] font-bold uppercase tracking-widest transition-all ${
                  isActive(link.path) 
                    ? 'text-brand-yellow' 
                    : 'text-[#525252] hover:text-[#171717]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/" 
              state={{ scrollToBook: true }}
              className="bg-brand-yellow hover:bg-[#FFB300] text-[#171717] px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-300 active:scale-95 ${
                isOpen 
                  ? 'bg-brand-yellow border-brand-yellow text-[#171717] hover:text-[#171717] active:text-[#171717] focus:text-[#171717] shadow-lg shadow-brand-yellow/20'
                  : 'bg-white border-[#E5E7EB] text-[#171717]'
              }`}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-tighter">
                {isOpen ? 'Close' : 'Menu'}
              </span>
              <div className="relative w-5 h-5 flex items-center justify-center">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#FFFDF5] pb-12 transition-all animate-fade-in">
          <div className="px-4 pt-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(event) => {
                  if (link.path === '/') handleHomeClick(event);
                  setIsOpen(false);
                }}
                className={`block px-5 py-4 rounded-xl text-sm font-bold uppercase tracking-widest ${
                  isActive(link.path)
                    ? 'bg-[#FFFDF5] text-brand-yellow'
                    : 'text-[#525252] hover:bg-[#FFFDF5]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                to="/"
                state={{ scrollToBook: true }}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-yellow text-[#171717] hover:text-[#171717] active:text-[#171717] focus:text-[#171717] px-6 py-5 rounded-xl font-extrabold uppercase tracking-widest shadow-lg shadow-brand-yellow/20 transition-transform active:scale-[0.98]"
              >
                Book Your Ride
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
