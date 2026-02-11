import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

export default function DateFilter({ setFilterRange }) {
  return (
    <RangePicker
      onChange={(dates) => setFilterRange(dates)}
      style={{width: "100%"}}
    />
  );
}
