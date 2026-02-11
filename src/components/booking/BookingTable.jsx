import { Table, Button, Popconfirm } from "antd";
import { useMemo, useCallback } from "react";
import dayjs from "dayjs";

export default function BookingTable({
  bookings,
  deleteBooking,
  filterRange
}) {

 
  const processed = useMemo(() => {
    return bookings.map(b => {
      const duration = dayjs(b.end).diff(b.start, "day");
      const total = duration * b.price;
      return { ...b, duration, total };
    });
  }, [bookings]);

  
  const filtered = useMemo(() => {
    if (!filterRange || !filterRange[0] || !filterRange[1]) {
      return processed;
    }

    const startFilter = filterRange[0];
    const endFilter = filterRange[1];

    return processed.filter(b => {
      const d = dayjs(b.start);
      return (
        d.isSame(startFilter, "day") ||
        d.isSame(endFilter, "day") ||
        (d.isAfter(startFilter, "day") &&
         d.isBefore(endFilter, "day"))
      );
    });

  }, [processed, filterRange]);

 
  const handleDelete = useCallback((id) => {
    deleteBooking(id);
  }, [deleteBooking]);

  const columns = [
    { title: "Customer Name", dataIndex: "customer" },
    { title: "Room Type", dataIndex: "room" },
    { title: "Start Date", dataIndex: "start" },
    { title: "End Date", dataIndex: "end" },
    { title: "Duration", dataIndex: "duration" },
    { title: "Price Per Day", dataIndex: "price" },
    { title: "Total Cost", dataIndex: "total" },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete booking?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      )
    }
  ];

  return (
    <Table
      rowKey="id"
      dataSource={filtered}
      columns={columns}
    />
  );
}
