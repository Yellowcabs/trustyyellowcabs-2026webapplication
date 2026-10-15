import React, { useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { BookATrip } from './pages/BookATrip';
import { BookingConfirmed } from './pages/BookingConfirmed';
import { FloatingCallButton } from './components/FloatingCallButton';
import { MobileTabBar } from './components/MobileTabBar';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const { pathname } = useLocation();
  const [homeBookingMapOpen, setHomeBookingMapOpen] = React.useState(false);
  const isBookingConfirmed = pathname === '/booking-confirmed';
  const isNoIndexRoute = pathname === '/book-a-trip' || isBookingConfirmed;

  return (
    <>
      <ScrollToTop />
      <Helmet>
        {isNoIndexRoute && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      <div className="min-h-screen flex flex-col bg-white">
        {!isBookingConfirmed && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onBookingMapChange={setHomeBookingMapOpen} />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-a-trip" element={<BookATrip />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            <Route path="/bill-request" element={<Navigate to="/" replace />} />
           
          

          </Routes>
        </main>
        {!isBookingConfirmed && <Footer />}
        {!isBookingConfirmed && <FloatingCallButton />}
        {!isBookingConfirmed && pathname !== '/book-a-trip' && !(pathname === '/' && homeBookingMapOpen) && <MobileTabBar />}
      </div>
    </>
  );
};

export default App;
