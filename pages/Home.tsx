import React, { useEffect, useCallback, useRef, useState } from 'react';
import { BookingForm } from '../components/BookingForm';
import { SERVICES_DATA, TESTIMONIALS_DATA } from '../constants';
import { ArrowRight, Star, MapPin, CheckCircle, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Home: React.FC<{ onBookingMapChange?: (active: boolean) => void }> = ({ onBookingMapChange }) => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const handledScrollToBook = useRef(false);
  const feedbackCloneCount = 3;
  const [feedbackIndex, setFeedbackIndex] = useState(feedbackCloneCount);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [feedbackPaused, setFeedbackPaused] = useState(false);
  const [feedbackInView, setFeedbackInView] = useState(false);
  const [feedbackTransitioning, setFeedbackTransitioning] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const feedbackSectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);

  const scrollToBooking = useCallback(() => {
    const element = document.getElementById('book');
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  const nextFeedback = useCallback(() => {
    setFeedbackTransitioning(true);
    setFeedbackIndex((current) => current + 1);
  }, []);

  const previousFeedback = useCallback(() => {
    setFeedbackTransitioning(true);
    setFeedbackIndex((current) => current - 1);
  }, []);

  useEffect(() => {
    const updateVisibleReviews = () => {
      setVisibleReviews(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    };
    updateVisibleReviews();
    window.addEventListener('resize', updateVisibleReviews);
    return () => window.removeEventListener('resize', updateVisibleReviews);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);
    return () => motionQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setFeedbackInView(true);
      return;
    }

    const section = feedbackSectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setFeedbackInView(true),
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (feedbackPaused || reducedMotion || !feedbackInView) return;
    const interval = window.setInterval(nextFeedback, 2000);
    return () => window.clearInterval(interval);
  }, [feedbackPaused, reducedMotion, feedbackInView, nextFeedback]);

  useEffect(() => {
    if (feedbackTransitioning) return;
    const frame = window.requestAnimationFrame(() => setFeedbackTransitioning(true));
    return () => window.cancelAnimationFrame(frame);
  }, [feedbackTransitioning]);

  useEffect(() => {
    if (state && state.scrollToBook && !handledScrollToBook.current) {
      handledScrollToBook.current = true;
      navigate(pathname, { replace: true, state: null });
      requestAnimationFrame(scrollToBooking);
    } else if (handledScrollToBook.current) {
      return;
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }
  }, [state, pathname, navigate, scrollToBooking]);

  const TestimonialCard: React.FC<{ t: any }> = ({ t }) => (
    <article className="flex h-full min-h-[270px] w-full flex-col rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)]   sm:p-7">
      <div className="mb-5 flex gap-1 text-[#FFC107]" aria-label={`${t.rating} out of 5 stars`}>
        {[...Array(t.rating)].map((_, i) => <Star key={i} size={15} fill="currentColor" strokeWidth={1.8} aria-hidden="true" />)}
      </div>
      <p className="mb-7 flex-1 text-sm font-medium leading-7 text-slate-700 ">"{t.comment}"</p>
      <div className="flex items-center gap-3 border-t border-[#E5E7EB] pt-5 ">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFC107] text-xs font-extrabold text-[#171717]">
          {t.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-[#171717] ">{t.name}</h4>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#525252] ">{t.role}</span>
        </div>
      </div>
    </article>
  );

  const feedbackItems = [
    ...TESTIMONIALS_DATA.slice(-feedbackCloneCount),
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA.slice(0, feedbackCloneCount),
  ];
  const feedbackPosition = ((feedbackIndex - feedbackCloneCount) % TESTIMONIALS_DATA.length + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white  transition-colors">
      {/* Hero Section */}
       <section className="relative min-h-[50vh] lg:min-h-[85vh] flex items-start lg:items-center bg-white  overflow-hidden pt-5 pb-10 lg:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#FFFDF5]  rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="hidden lg:flex flex-col space-y-10 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFFDF5]  border border-[#E5E7EB]  rounded-lg w-fit mx-auto lg:mx-0 shadow-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-yellow"></span>
                <span className="text-[#525252]  text-[10px] font-bold uppercase tracking-widest">TrustyYellowCabs</span>
              </div>

            <div className="space-y-4 md:space-y-6">
  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl 
                 font-extrabold text-[#171717]
                 leading-tight md:leading-[1.1] tracking-tight">
    Nearby Taxi Booking<br />
    <span className="text-brand-yellow">Coimbatore</span>
  </h1>

  <p className="text-base sm:text-lg md:text-xl 
                text-[#525252]
                max-w-md md:max-w-lg leading-relaxed font-medium">
    <Link to="/taxi-service-in-coimbatore" className="underline decoration-[#FFC107]/50 underline-offset-4">Reliable cab service in Coimbatore</Link>. Safe, clean, and always on time.
  </p>
</div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2.5 text-[#171717] ">
                  <CheckCircle className="text-brand-yellow" size={18} />
                  <span className="text-xs font-bold">No Hidden Charges</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#171717] ">
                  <CheckCircle className="text-brand-yellow" size={18} />
                  <span className="text-xs font-bold">24/7 Support</span>
                </div>
              </div>
            </div>

           <div className="home-booking-form relative flex justify-center lg:justify-end order-1 lg:order-2 w-full lg:w-auto mt-0 lg:mt-0" id="book">
              <style>{`
                @media (max-width: 767px) {
                  #book.home-booking-form > div:not(.fixed) [data-sheet-drag-surface="blank"] {
                    display: none !important;
                    height: 0 !important;
                    margin-top: 0 !important;
                  }

                  #book.home-booking-form > div:not(.fixed) form > div:has([data-sheet-drag-surface="blank"]) > div:has([data-sheet-drag-surface="blank"]) {
                    padding-bottom: 8px !important;
                    margin-bottom: 0 !important;
                  }
                }
              `}</style>
              <BookingForm onMapActiveChange={onBookingMapChange} />
            </div>
          </div>
        </div>
      </section>

      {/* App-Style Quote / Trust Highlights */}
      <section className="select-none bg-white pt-6 pb-0 sm:pt-8 sm:pb-0 md:pt-14 md:pb-14 lg:pt-16 lg:pb-0">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-[#FFC107]"></div>

          <p className="mx-auto max-w-6xl whitespace-nowrap text-[clamp(0.625rem,3.2vw,1.5rem)] font-extrabold leading-[1.25] tracking-[-0.025em] text-[#171717] sm:text-3xl md:text-4xl lg:text-[42px] xl:text-5xl">
            Local ride ah? Outstation ah? <span className="text-[#FFC107]">Travel Anytime!</span>
          </p>

          <div className="mx-auto mt-7 flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-[24px] border border-[#FFF8E1] bg-white px-5 py-5 shadow-[0_12px_32px_rgba(255,193,7,0.08)] sm:w-fit sm:flex-row sm:gap-6 sm:rounded-full sm:px-8 sm:py-4 md:gap-8 md:px-10">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap">
              <div className="flex gap-0.5 text-[#FFC107]" aria-label="Five stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={17} fill="currentColor" strokeWidth={1.8} aria-hidden="true" />
                ))}
              </div>
              <span className="whitespace-nowrap text-xs font-extrabold text-[#171717] sm:text-sm">4.9/5 Rating</span>
            </div>

            <div className="h-px w-20 shrink-0 bg-[#D6DCE5] sm:h-8 sm:w-px"></div>

            <div className="flex items-center justify-center gap-2.5 text-[#171717]">
              <Users className="shrink-0 text-[#FFC107]" size={23} strokeWidth={2.2} aria-hidden="true" />
              <span className="text-xs font-bold leading-5 sm:text-sm">10,000+ Happy Rides Completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white pt-10 pb-0 sm:pt-12 sm:pb-0 md:py-20 lg:pt-16 lg:pb-24">
        <div className="container mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12 lg:mb-16">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#171717] md:text-5xl">Our Services</h2>
            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#FFC107]"></div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {SERVICES_DATA.map((service, index) => {
              const accents = [
                { shape: '#FFF8E1', shapeSoft: '#FFFDF5', dot: '#FFB300', border: '#FFFDF5' },
                { shape: '#DDF2FF', shapeSoft: '#F0F9FF', dot: '#60BDF5', border: '#DBF0FC' },
                { shape: '#FFECCF', shapeSoft: '#FFF7E9', dot: '#FFB65D', border: '#FCE9CB' },
                { shape: '#F0E2FF', shapeSoft: '#FAF3FF', dot: '#C77BF2', border: '#EEDFFF' },
              ];
              const accent = accents[index % accents.length];

              return (
                <div
                  key={service.id}
                  className="group relative isolate flex h-[410px] flex-col overflow-hidden rounded-[22px] border bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.11)] sm:h-[400px] sm:p-7 xl:h-[410px] xl:p-8"
                  style={{ borderColor: accent.border }}
                >
                  <div
                    className="pointer-events-none absolute -right-12 -top-20 -z-10 h-64 w-72 rounded-[48%_0_45%_55%] opacity-90 transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ background: `linear-gradient(145deg, ${accent.shapeSoft} 20%, ${accent.shape} 100%)` }}
                  ></div>
                  <div
                    className="pointer-events-none absolute -bottom-24 -right-16 -z-10 h-48 w-48 rounded-full opacity-70 transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{ background: `linear-gradient(145deg, ${accent.shapeSoft}, ${accent.shape})` }}
                  ></div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-5 h-11 w-11 opacity-85 sm:right-6 sm:top-6"
                    style={{ backgroundImage: `radial-gradient(${accent.dot} 1.6px, transparent 1.8px)`, backgroundSize: '10px 10px' }}
                  ></div>

                  <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-[#FFF8E1] text-[#FFC107] shadow-[inset_0_0_0_1px_rgba(255,193,7,0.04)] sm:h-[68px] sm:w-[68px]">
                    <MapPin size={31} strokeWidth={2.4} aria-hidden="true" />
                  </div>

                  <h3 className="relative text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#171717] xl:text-[22px]">
                    {service.title}
                  </h3>
                  <div className="mb-5 mt-4 h-1 w-10 rounded-full bg-[#FFC107]"></div>

                  <p className="mb-7 flex-1 text-sm font-medium leading-6 text-[#71809B] xl:text-[15px]">
                    {service.description}
                  </p>

                  <Link
                    to="/services"
                    className="inline-flex w-fit items-center gap-4 text-[11px] font-extrabold uppercase tracking-[0.13em] text-[#171717] outline-none transition-colors duration-300 hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-4"
                  >
                    Details
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107] text-[#171717] shadow-[0_8px_18px_rgba(255,193,7,0.28)] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={feedbackSectionRef}
        className={`relative overflow-hidden border-t border-[#E5E7EB] bg-white py-16 transition-all duration-700 ease-out   sm:py-20 lg:py-24 motion-reduce:transform-none motion-reduce:transition-none ${feedbackInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <div className="mx-auto mb-4 h-1 w-14 rounded-full bg-[#FFC107]"></div>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#171717]  md:text-5xl">Feedback</h2>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#525252] ">A Trusted Taxi Network in Kovai</p>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setFeedbackPaused(true)}
            onMouseLeave={() => setFeedbackPaused(false)}
            onFocusCapture={() => setFeedbackPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setFeedbackPaused(false);
            }}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
              setFeedbackPaused(true);
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current !== null) {
                const distance = touchStartX.current - event.changedTouches[0].clientX;
                if (Math.abs(distance) > 40) distance > 0 ? nextFeedback() : previousFeedback();
              }
              touchStartX.current = null;
              setFeedbackPaused(false);
            }}
            onTouchCancel={() => {
              touchStartX.current = null;
              setFeedbackPaused(false);
            }}
          >
            <div className="-mx-2 overflow-hidden touch-pan-y sm:-mx-3">
              <div
                className={`flex items-stretch ${feedbackTransitioning && !reducedMotion ? 'transition-transform duration-500 ease-in-out' : 'transition-none'}`}
                style={{ transform: `translateX(-${feedbackIndex * (100 / visibleReviews)}%)` }}
                onTransitionEnd={() => {
                  if (feedbackIndex >= TESTIMONIALS_DATA.length + feedbackCloneCount) {
                    setFeedbackTransitioning(false);
                    setFeedbackIndex(feedbackIndex - TESTIMONIALS_DATA.length);
                  } else if (feedbackIndex < feedbackCloneCount) {
                    setFeedbackTransitioning(false);
                    setFeedbackIndex(TESTIMONIALS_DATA.length + feedbackIndex);
                  }
                }}
              >
                {feedbackItems.map((testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="h-auto shrink-0 px-2 sm:px-3"
                    style={{ flexBasis: `${100 / visibleReviews}%` }}
                  >
                    <TestimonialCard t={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={previousFeedback}
                aria-label="Previous review"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#171717] transition-colors hover:border-[#FFC107] hover:text-[#FFC107] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]   "
              >
                <ArrowRight size={17} className="rotate-180" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2" aria-label={`Review ${feedbackPosition + 1} of ${TESTIMONIALS_DATA.length}`}>
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={`h-1.5 rounded-full transition-all duration-300 ${feedbackPosition % 5 === dot ? 'w-6 bg-[#FFC107]' : 'w-1.5 bg-slate-300 '}`}
                  ></span>
                ))}
              </div>

              <button
                type="button"
                onClick={nextFeedback}
                aria-label="Next review"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#171717] transition-colors hover:border-[#FFC107] hover:text-[#FFC107] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]   "
              >
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-10 text-center sm:mt-12">
            <button
              onClick={scrollToBooking}
              className="rounded-lg bg-[#FFC107] px-10 py-4 text-xs font-extrabold uppercase tracking-widest text-[#171717] shadow-[0_8px_22px_rgba(255,193,7,0.24)] transition-colors hover:bg-[#FFB300] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-4 active:bg-[#FFB300]"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
