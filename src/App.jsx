import { Layout, Typography } from "antd";
import Dashboard from "./pages/Dashboard";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          Booking Management & Analytics
        </Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <Dashboard />
      </Content>
    </Layout>
  );
}

export default App;
