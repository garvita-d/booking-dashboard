import { Layout, Card, Typography, Divider } from "antd";
import BookingForm from "../components/booking/BookingForm";
import BookingTable from "../components/booking/BookingTable";
import DateFilter from "../components/booking/DateFilter";

const { Content } = Layout;
const { Title } = Typography;

export default function BookingManagement({
  bookings,
  filterRange,
  setFilterRange,
  addBooking,
  deleteBooking,
}) {
  return (
    <Layout>
      <Content style={{ padding: 24 }}>
        <Title level={2}>Booking Management & Analytics</Title>

        <Card title="Add Booking" style={{ marginBottom: 20 }}>
          <BookingForm addBooking={addBooking} />
        </Card>

        <Card title="Filter Bookings" style={{ marginBottom: 20 }}>
          <DateFilter setFilterRange={setFilterRange} />
        </Card>

        <Divider />

        <Card title="Bookings Table">
          <BookingTable
            bookings={bookings}
            deleteBooking={deleteBooking}
            filterRange={filterRange}
          />
        </Card>
      </Content>
    </Layout>
  );
}
