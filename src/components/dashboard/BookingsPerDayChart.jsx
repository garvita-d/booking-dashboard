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
    //if bookings is missing or empty, show a message instead of chart
    return <Card title="Bookings Per Day">No data available</Card>;
  }

  const bookingsPerDay = useMemo(() => {
    // for booking changes
    const result = {}; // empty object to store booking

    bookings.forEach((booking) => {
      //convert date and format it
      const date = dayjs(booking.arrivalDate).format("YYYY-MM-DD");

      if (!result[date]) {
        result[date] = {
          //create new object if its new for that date
          date,
          bookingCount: 0,
        };
      }

      result[date].bookingCount += 1; //else increase the count of bookings if done on same date
    });

    return Object.values(result).sort(
      (
        a,
        b, // for charts in ascending order
      ) => dayjs(a.date).diff(dayjs(b.date)), //duration between 2 dates entered by user
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
