import { useState, useCallback, useEffect } from "react";

export default function useBookings() {

  const [bookings, setBookings] = useState([]);
  const [filterRange, setFilterRange] = useState(null);

  
  const addBooking = useCallback((booking) => {
    setBookings(prev => [...prev, booking]);
  }, []);

 
  const deleteBooking = useCallback((id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  }, []);

 
  useEffect(() => {
   
  }, [bookings]);

  return {
    bookings,
    filterRange,
    setFilterRange,
    addBooking,
    deleteBooking
  };
}
