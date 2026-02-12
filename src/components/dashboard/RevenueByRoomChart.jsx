import { Card } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Bar,
  Line,
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
        <ComposedChart data={revenueData}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="roomType" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Soft background emphasis */}
          <Area
            type="monotone"
            dataKey="totalRevenue"
            fill="#f9e0c3"
            stroke="#f2b87b"
          />

          {/* Main revenue bars */}
          <Bar dataKey="totalRevenue" barSize={40} fill="#f2b87b" />

          {/* Trend line on top */}
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#d98c3a"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}
