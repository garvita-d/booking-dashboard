import { Form, Input, Select, DatePicker, InputNumber, Button } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function BookingForm({ addBooking }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const booking = {
      id: Date.now(),
      customerName: values.customer,
      roomType: values.room,
      arrivalDate: dayjs(values.dates[0]).format("YYYY-MM-DD"),
      departureDate: dayjs(values.dates[1]).format("YYYY-MM-DD"),
      pricePerDay: values.price,
    };

    addBooking(booking);
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Customer Name"
        name="customer"
        rules={[{ required: true, message: "Enter name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Room Type" name="room" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "Standard" },
            { value: "Deluxe" },
            { value: "Suite" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Booking Date" name="dates" rules={[{ required: true }]}>
        <RangePicker />
      </Form.Item>

      <Form.Item
        label="Price Per Day"
        name="price"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit Booking
      </Button>
    </Form>
  );
}
