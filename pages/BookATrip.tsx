import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';

export const BookATrip: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="book-a-trip-page min-h-[100dvh] bg-white">
        <BookingForm forceMapActive onMapBack={() => navigate('/')} />
      </div>
    </>
  );
};
