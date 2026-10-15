import React from 'react';
import { Users, Shield, Clock, Star, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/', { state: { scrollToBook: true } });
  };

  return (
    <div className="min-h-screen bg-slate-50  transition-colors duration-300">

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 pt-5 pb-24 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-[#FF6467] font-bold text-[10px] uppercase tracking-[0.2em]">
              <div className="h-px w-8 bg-[#FF6467]"></div>
              Mission & Vision
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900  uppercase tracking-tight leading-tight">
             Cab Service Near Me <br />Coimbatore
            </h2>
            <p className="text-lg text-slate-600  leading-relaxed font-medium">
             Book your ride in Coimbatore with online taxi booking, experienced drivers, and clear, upfront pricing.
            </p>
            <p className="text-lg text-slate-600  leading-relaxed font-medium">
             Experience professional taxi services with easy online booking and reliable vehicles throughout Coimbatore and Tamil Nadu.
Call a taxi and start your journey.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6">
              <div className="p-6 sm:p-8 bg-white  rounded-2xl shadow-sm border border-slate-100  hover:shadow-lg transition-all group">
                <div className="w-10 h-10 bg-[#FF6467]/10 rounded-xl flex items-center justify-center text-[#FF6467] mb-4 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-slate-900  mb-2">10+</span>
                <span className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Years of Trust</span>
              </div>
              <div className="p-6 sm:p-8 bg-white  rounded-2xl shadow-sm border border-slate-100  hover:shadow-lg transition-all group">
                <div className="w-10 h-10 bg-[#FF6467]/10 rounded-xl flex items-center justify-center text-[#FF6467] mb-4 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-slate-900  mb-2">60k+</span>
                <span className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Happy Travelers</span>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
            <div className="space-y-3 sm:space-y-4 mt-8 sm:mt-12">
              <img src="/images/ChatGPT Image Oct 12, 2025, 09_27_33 AM.webp" width="1080" height="1350" fetchPriority="high" className="rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500 border-2 sm:border-4 border-white  aspect-[3/4] w-full object-cover" alt="Professional Driving" />
              <div className="bg-[#FF6467] aspect-[2/1] rounded-2xl flex items-center justify-center text-white shadow-lg transform hover:-translate-y-1 transition-transform p-4">
                <div className="text-center">
                  <p className="text-xl sm:text-3xl font-extrabold">24/7</p>
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tighter">Availability</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-slate-900  aspect-[2/1] rounded-2xl flex items-center justify-center text-white shadow-lg transform hover:-translate-y-1 transition-transform p-4">
                <div className="text-center">
                  <p className="text-xl sm:text-3xl font-extrabold">100%</p>
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tighter">Safe Rides</p>
                </div>
              </div>
              <img src="/images/taxi4-5 Verticle 1080 x 1350px.webp" width="1080" height="1350" loading="lazy" decoding="async" className="rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500 border-2 sm:border-4 border-white  aspect-[3/4] w-full object-cover" alt="Travel Experience" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="border-y border-slate-100 bg-white py-8 md:py-16">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF6467]">The Trusty Yellow Promise</p>
              <h2 className="max-w-xs text-3xl font-extrabold uppercase tracking-tight text-slate-900 sm:text-4xl">Why We Stand Out</h2>
            </div>
            <div className="divide-y divide-slate-200 lg:col-span-8">
            {[
              { icon: Shield, title: 'Safety First', desc: 'Verified drivers and GPS-tracked vehicles for complete peace of mind on every outstation taxi and Coimbatore ride.' },
              { icon: Clock, title: 'Punctuality', desc: 'No more waiting! Skip Red Taxi and book Trusty Yellow Cabs for Coimbatore taxi rides with guaranteed on-time pickups.' },
              { icon: Star, title: 'Premium Service', desc: 'Ride comfortably in well-maintained cars with AC and reliable, professional drivers.' },
            ].map((value, i) => (
              <div key={i} className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 py-5 first:pt-0 last:pb-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FF6467]/40 text-[#FF6467]">
                  <value.icon size={22} strokeWidth={2} />
                </div>
                <div className="min-w-0 max-w-2xl">
                  <h3 className="mb-1.5 text-base font-bold uppercase tracking-tight text-[#0B1733] sm:text-lg">{value.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">{value.desc}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:mt-20 md:p-10">
          <div className="flex flex-col items-start gap-5 text-left md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="min-w-0">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF6467]">Ready to Ride?</p>
              <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#0B1733] sm:text-4xl md:text-5xl">
              Ready for a <br/>
              <span className="text-[#FF6467]">Better Ride?</span>
              </h2>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
              Coimbatore's Number One Choice
              </p>
            </div>
            <button 
              onClick={handleBookNow}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FF6467] px-0 text-xs font-black uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#FF555D] active:scale-95 md:h-auto md:w-auto md:px-6 md:py-3.5"
            >
              Book Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
