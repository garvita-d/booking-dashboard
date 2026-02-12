import { Card } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#f2b87b", "#f6cfa1", "#f9e0c3", "#e9a85f", "#d98c3a"];

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
          name: date,
          value: 0,
        };
      }

      result[date].value += 1;
    });

    return Object.values(result).sort((a, b) =>
      dayjs(a.name).diff(dayjs(b.name)),
    );
  }, [bookings]);

  return (
    <Card title="Bookings Per Day">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={bookingsPerDay}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {bookingsPerDay.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
