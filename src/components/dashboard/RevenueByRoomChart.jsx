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
    return <Card title="Revenue by Room Type">No data available</Card>;
  }

  const revenueData = useMemo(() => {
    const result = {};

    bookings.forEach((booking) => {
      const duration = dayjs(booking.departureDate).diff(
        dayjs(booking.arrivalDate),
        "day",
      );

      const totalCost = duration * booking.pricePerDay;

      if (!result[booking.roomType]) {
        result[booking.roomType] = {
          roomType: booking.roomType,
          totalRevenue: 0,
        };
      }

      result[booking.roomType].totalRevenue += totalCost;
    });

    return Object.values(result);
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
