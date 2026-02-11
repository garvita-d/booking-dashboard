import { Card } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BookingsPerDayChart({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return <Card title="Bookings Per Day">No data available</Card>;
  }

  const bookingsPerDay = useMemo(() => {
    const result = {};

    bookings.forEach((booking) => {
      const date = dayjs(booking.arrivalDate).format("YYYY-MM-DD");

      if (!result[date]) {
        result[date] = {
          date,
          bookingCount: 0,
        };
      }

      result[date].bookingCount += 1;
    });

    // ✅ sort by date so the line chart flows correctly
    return Object.values(result).sort((a, b) =>
      dayjs(a.date).diff(dayjs(b.date)),
    );
  }, [bookings]);

  return (
    <Card title="Bookings Per Day">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={bookingsPerDay}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="bookingCount" stroke="#f2b87b" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
