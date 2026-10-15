import React from 'react';

export const FloatingCallButton: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes fp-whatsapp-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes fp-whatsapp-pulse {
          0%, 70%, 100% { opacity: 0; transform: scale(1); }
          12% { opacity: 0.35; }
          45% { opacity: 0; transform: scale(1.32); }
        }
        .fp-whatsapp-float { animation: fp-whatsapp-float 4.5s ease-in-out infinite; }
        .fp-whatsapp-pulse { animation: fp-whatsapp-pulse 4.5s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fp-whatsapp-float, .fp-whatsapp-pulse { animation: none; }
        }
      `}</style>
      <a
        href="https://wa.me/919488834020?text=Hello%2C%20I%20would%20like%20to%20book%20a%20cab."
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-24 right-4 z-[60] hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-[1.06] hover:shadow-[0_8px_24px_rgba(37,211,102,0.35)] active:scale-95 md:bottom-28 md:right-6 md:flex"
        aria-label="Chat on WhatsApp"
      >
        <span className="fp-whatsapp-float relative flex h-full w-full items-center justify-center">
          <span className="fp-whatsapp-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]" aria-hidden="true" />
          <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current" aria-hidden="true">
            <path d="M12 2a9.9 9.9 0 0 0-8.53 15.02L2 22l5.13-1.43A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-3.05.85.86-2.97-.19-.31A8 8 0 1 1 12 20Zm4.39-5.98c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.93-1.19 7.3 7.3 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.56 4.07 3.59.57.25 1.01.4 1.36.51.57.18 1.09.15 1.5.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
          </svg>
        </span>
      </a>
    </>
  );
};
