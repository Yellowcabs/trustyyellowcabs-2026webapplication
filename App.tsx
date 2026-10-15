import React, { useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { BookATrip } from './pages/BookATrip';
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

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onBookingMapChange={setHomeBookingMapOpen} />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-a-trip" element={<BookATrip />} />
            <Route path="/bill-request" element={<Navigate to="/" replace />} />
           
          

          </Routes>
        </main>
        <Footer />
        <FloatingCallButton />
        {pathname !== '/book-a-trip' && !(pathname === '/' && homeBookingMapOpen) && <MobileTabBar />}
      </div>
    </>
  );
};

export default App;
