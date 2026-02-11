import { Card } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueByRoomChart({ bookings }) {
  if (!bookings || bookings.length === 0) {
    //if bookings is missing or empty, show a message instead of chart
    return <Card title="Revenue by Room Type">No data available</Card>;
  }

  const revenueData = useMemo(() => {
    const result = {}; //empty object

    bookings.forEach((booking) => {
      const duration = dayjs(booking.departureDate).diff(
        //duration of day stayed by calculating difference
        dayjs(booking.arrivalDate),
        "day",
      );

      const totalCost = duration * booking.pricePerDay; // calculating revenue for each day

      if (!result[booking.roomType]) {
        //setting room type as anything, it could be any type of room whichever is entered
        result[booking.roomType] = {
          roomType: booking.roomType,
          totalRevenue: 0,
        };
      }

      result[booking.roomType].totalRevenue += totalCost; // if multiple bookings share the same room type then their revenue adds up
    });

    return Object.values(result); //object converted to array for chart
  }, [bookings]);

  return (
    <Card title="Revenue by Room Type">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <XAxis dataKey="roomType" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalRevenue" fill="#f2b87b" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
