import { Card } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const YEAR_START = 2015;
const YEAR_END = 2030;

const YEAR_TICKS = Array.from(
  { length: YEAR_END - YEAR_START + 1 },
  (_, i) => YEAR_START + i,
);

export default function YearlyBookingsScatterChart({ bookings }) {
  const yearlyData = useMemo(() => {
    const result = {};

    bookings.forEach((booking) => {
      const year = dayjs(booking.arrivalDate).year();

      if (!result[year]) {
        result[year] = {
          year,
          bookingsCount: 0,
        };
      }

      result[year].bookingsCount += 1;
    });

    return Object.values(result).sort((a, b) => a.year - b.year);
  }, [bookings]);

  if (!yearlyData.length) {
    return <Card title="Bookings by Year">No data available</Card>;
  }

  return (
    <Card title="Bookings by Year">
      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
          <XAxis
            type="number"
            dataKey="year"
            domain={[YEAR_START, YEAR_END]}
            ticks={YEAR_TICKS}
            allowDataOverflow
            tick={{ fill: "#000" }}
            name="Year"
          />

          <YAxis
            type="number"
            dataKey="bookingsCount"
            tick={{ fill: "#000" }}
            name="Bookings"
            width={60}
          />

          <Tooltip cursor={{ strokeDasharray: "3 3" }} />

          <Scatter data={yearlyData} fill="#f2b87b" />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
}
