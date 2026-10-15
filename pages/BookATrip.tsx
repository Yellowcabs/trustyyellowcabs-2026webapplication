import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';

export const BookATrip: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Book a Trip | FastPoint Cab</title>
        <meta name="description" content="Book a taxi trip with FastPoint Cab in Coimbatore." />
      </Helmet>
      <div className="min-h-[100dvh] bg-white">
        <BookingForm forceMapActive onMapBack={() => navigate('/')} />
      </div>
    </>
  );
};
