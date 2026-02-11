import { Table, Button, Popconfirm } from "antd";
import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function BookingTable({ bookings, deleteBooking, filterRange }) {
  const processed = useMemo(() => {
    return bookings.map((b) => {
      const duration = dayjs(b.departureDate).diff(b.arrivalDate, "day");
      const total = duration * b.pricePerDay;

      return {
        ...b,
        duration,
        total,
      };
    });
  }, [bookings]);

  const filtered = useMemo(() => {
    if (!filterRange || !filterRange[0] || !filterRange[1]) {
      return processed;
    }

    const startFilter = filterRange[0];
    const endFilter = filterRange[1];

    return processed.filter((b) => {
      const date = dayjs(b.arrivalDate);

      return (
        date.isSame(startFilter, "day") ||
        date.isSame(endFilter, "day") ||
        (date.isAfter(startFilter, "day") && date.isBefore(endFilter, "day"))
      );
    });
  }, [processed, filterRange]);

  const handleDelete = useCallback(
    (id) => {
      deleteBooking(id);
    },
    [deleteBooking],
  );

  const columns = [
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Room Type", dataIndex: "roomType" },
    { title: "Start Date", dataIndex: "arrivalDate" },
    { title: "End Date", dataIndex: "departureDate" },
    { title: "Duration", dataIndex: "duration" },
    { title: "Price Per Day", dataIndex: "pricePerDay" },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete booking?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table rowKey="id" dataSource={filtered} columns={columns} />

      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Link to="/dashboard">
          <Button type="primary">Go to Dashboard</Button>
        </Link>
      </div>
    </>
  );
}
