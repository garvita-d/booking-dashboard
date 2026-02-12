import { Card, Row, Col, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import RevenueByRoomChart from "../components/dashboard/RevenueByRoomChart";
import BookingsPerDayChart from "../components/dashboard/BookingsPerDayChart";
import WeeklyRevenueChart from "../components/dashboard/WeeklyRevenueChart";
import BookingCalendar from "../components/dashboard/BookingCalendar";
import MonthlyBookingsAreaChart from "../components/dashboard/MonthlyBookingsAreaChart";
import YearlyBookingsScatterChart from "../components/dashboard/YearlyBookingsScatterChart";
const { Title, Text } = Typography;

export default function DashboardPage({ bookings }) {
  return (
    <div style={{ padding: 24 }}>
      {/* Title */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={3} style={{ marginBottom: 0 }}>
          Analytics Dashboard
        </Title>
        <Text type="secondary">Booking insights and revenue trends</Text>
      </Card>

      {/* Back button */}
      <Card style={{ marginBottom: 16 }}>
        <Link to="/">
          <Button
            style={{
              backgroundColor: "#f2b87b",
              borderColor: "#f2b87b",
              color: "#000",
            }}
          >
            Back to Bookings
          </Button>
        </Link>
      </Card>

      {/* Top charts */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <RevenueByRoomChart bookings={bookings} />
        </Col>
        <Col xs={24} md={12}>
          <BookingsPerDayChart bookings={bookings} />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <MonthlyBookingsAreaChart bookings={bookings} />
        </Col>
        <Col xs={24} md={12}>
          <YearlyBookingsScatterChart bookings={bookings} />
        </Col>
      </Row>

      {/* Weekly revenue + calendar side by side */}
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <WeeklyRevenueChart bookings={bookings} />
        </Col>

        <Col xs={24} md={12}>
          <Card title="Booking Calendar">
            <BookingCalendar bookings={bookings} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
