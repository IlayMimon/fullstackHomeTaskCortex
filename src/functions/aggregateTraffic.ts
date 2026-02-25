import dayjs from "dayjs";
import type { TrafficEntry } from "../types/trafficEntry";

type Period = "week" | "month";

export function aggregateTraffic(
  entries: TrafficEntry[],
  period: Period,
): Omit<TrafficEntry, "id">[] {
  const map = new Map<string, number>();

  entries.forEach((entry) => {
    const date = dayjs(entry.date);

    let key: string;

    if (period === "week") {
      key = date.startOf("week").format("YYYY-MM-DD");
    } else {
      key = date.startOf("month").format("YYYY-MM-DD");
    }

    map.set(key, (map.get(key) || 0) + entry.visits);
  });

  return Array.from(map.entries()).map(([date, visits]) => ({ date, visits }));
}
