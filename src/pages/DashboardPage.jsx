import { Layout, Typography, Flex, Button } from "antd";
import { Link } from "react-router-dom";
import RevenueByRoomChart from "../components/dashboard/RevenueByRoomChart";
import BookingsPerDayChart from "../components/dashboard/BookingsPerDayChart";

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

const headerStyle = {
  textAlign: "center",
  height: 64,
  lineHeight: "64px",
  backgroundColor: "#f2b87b",
};

const siderStyle = {
  backgroundColor: "#f2b87b",
  padding: 16,
};

const contentStyle = {
  padding: 24,
  backgroundColor: "#fff7e6",
};

const footerStyle = {
  textAlign: "center",
  backgroundColor: "#f2b87b",
};

export default function DashboardPage({ bookings }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={headerStyle}>
        <Title level={3} style={{ margin: 0 }}>
          Analytics Dashboard
        </Title>
      </Header>

      <Layout>
        <Sider width={220} style={siderStyle}>
          <Text strong>Dashboard</Text>
        </Sider>

        <Content style={contentStyle}>
          {/* Back button */}
          <div>
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
          </div>

          <Flex gap="large" vertical>
            <RevenueByRoomChart bookings={bookings} />
            <BookingsPerDayChart bookings={bookings} />
          </Flex>
        </Content>
      </Layout>

      <Footer style={footerStyle}>Booking Analytics</Footer>
    </Layout>
  );
}
