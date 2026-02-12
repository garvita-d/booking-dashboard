import { Card } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyRevenueChart({ bookings }) {
  const weeklyRevenueData = useMemo(() => {
    const result = {};

    bookings.forEach((booking) => {
      const week = `Week ${dayjs(booking.arrivalDate).week()}`;

      const duration = dayjs(booking.departureDate).diff(
        dayjs(booking.arrivalDate),
        "day",
      );

      const revenue = duration * booking.pricePerDay;

      if (!result[week]) {
        result[week] = {
          week,
          Standard: 0,
          Deluxe: 0,
          Suite: 0,
        };
      }

      result[week][booking.roomType] += revenue;
    });

    return Object.values(result);
  }, [bookings]);

  if (!weeklyRevenueData.length) {
    return <Card title="Weekly Revenue">No data available</Card>;
  }

  return (
    <Card title="Weekly Revenue – Stacked by Room Type">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={weeklyRevenueData}>
          <XAxis
            dataKey="week"
            tick={{ fill: "#000" }}
            axisLine={{ stroke: "#000" }}
          />
          <YAxis tick={{ fill: "#000" }} axisLine={{ stroke: "#000" }} />
          <Tooltip
            contentStyle={{ color: "#000" }}
            labelStyle={{ color: "#000" }}
          />
          <Legend wrapperStyle={{ color: "#000" }} />

          <Bar dataKey="Standard" stackId="revenue" fill="#ffd591" />
          <Bar dataKey="Deluxe" stackId="revenue" fill="#f2b87b" />
          <Bar dataKey="Suite" stackId="revenue" fill="#d48806" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
