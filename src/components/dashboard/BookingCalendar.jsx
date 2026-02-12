import { Calendar, Tag } from "antd";
import dayjs from "dayjs";

const ROOM_COLORS = {
  Standard: "#ffd591",
  Deluxe: "#f2b87b",
  Suite: "#d48806",
};

export default function BookingCalendar({ bookings }) {
  const dateCellRender = (value) => {
    const currentDate = value.startOf("day");

    const staysToday = bookings.filter((b) => {
      const start = dayjs(b.arrivalDate).startOf("day");
      const end = dayjs(b.departureDate).startOf("day");

      return (
        currentDate.isSame(start, "day") ||
        (currentDate.isAfter(start, "day") && currentDate.isBefore(end, "day"))
      );
    });

    if (staysToday.length === 0) return null;

    return (
      <div>
        {staysToday.map((b) => (
          <div
            key={b.id}
            style={{
              backgroundColor: ROOM_COLORS[b.roomType],
              border: `1px solid ${ROOM_COLORS[b.roomType]}`,
              borderRadius: 4,
              padding: "2px 4px",
              marginBottom: 2,
              minHeight: 20,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#272727",
              }}
            >
              {b.customerName} • {b.roomType}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return <Calendar fullscreen={false} cellRender={cellRender} />;
}
