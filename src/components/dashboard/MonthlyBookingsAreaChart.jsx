import { Card } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyBookingsAreaChart({ bookings }) {
  const monthlyData = useMemo(() => {
    const result = {};

    bookings.forEach((booking) => {
      const monthKey = dayjs(booking.arrivalDate).format("MMM YYYY");

      if (!result[monthKey]) {
        result[monthKey] = {
          month: monthKey,
          bookingsCount: 0,
        };
      }

      result[monthKey].bookingsCount += 1;
    });

    return Object.values(result).sort((a, b) =>
      dayjs(a.month, "MMM YYYY").diff(dayjs(b.month, "MMM YYYY")),
    );
  }, [bookings]);

  if (!monthlyData.length) {
    return <Card title="Monthly Bookings">No data available</Card>;
  }

  return (
    <Card title="Bookings by Month">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={monthlyData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: "#000" }} />
          <YAxis tick={{ fill: "#000" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="bookingsCount"
            stroke="#f2b87b"
            fill="#ffd591"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
