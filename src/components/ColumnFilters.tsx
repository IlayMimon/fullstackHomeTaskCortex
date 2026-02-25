import { DatePicker } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

export const dropDownDateRange = ({ setSelectedKeys, confirm }: FilterDropdownProps) => {
  return (
    <DatePicker.RangePicker
      onChange={(dates) => {
        const selectedDate =
          dates && dates.length > 1
            ? [`${dates[0]?.toISOString()} - ${dates[1]?.toISOString()}`]
            : [];
        setSelectedKeys(selectedDate);
        confirm({ closeDropdown: false });
      }}
      placeholder={["Start Date", "End Date"]}
      format="YYYY-MM-DD"
    />
  );
};
