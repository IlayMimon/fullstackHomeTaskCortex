import type React from "react";
import type { TrafficEntry } from "../types/trafficEntry";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const onDateFilter = (value: boolean | React.Key, record: TrafficEntry) => {
  if (!value || typeof value !== "string" || !value.includes(" - ")) return true;
  const [startString, endString] = value.split(" - ");

  const startDate = dayjs(startString);
  const endDate = dayjs(endString);
  const recordDate = dayjs(record.date);

  return recordDate.isBetween(startDate, endDate, "day", "[]");
};
