import { Routes, Route, Navigate } from "react-router-dom";
import BookingManagement from "./pages/BookingManagement";
import DashboardPage from "./pages/DashboardPage";
import useBookings from "./hooks/useBookings";

function App() {
  const bookingState = useBookings(); // 🔑 SINGLE source of truth

  return (
    <Routes>
      <Route path="/" element={<BookingManagement {...bookingState} />} />

      <Route
        path="/dashboard"
        element={<DashboardPage bookings={bookingState.bookings} />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
