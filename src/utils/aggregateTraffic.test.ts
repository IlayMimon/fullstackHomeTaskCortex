import { describe, it, expect } from "vitest";
import { aggregateTraffic } from "../functions/aggregateTraffic";

describe("aggregateTraffic", () => {
  it("aggregates entries by week correctly", () => {
    const entries = [
      { id: "1", date: "2026-02-24", visits: 10 },
      { id: "2", date: "2026-02-25", visits: 20 },
    ];

    const result = aggregateTraffic(entries, "week");

    expect(result.length).toBe(1);
    expect(result[0].visits).toBe(30);
  });

  it("aggregates entries by month correctly", () => {
    const entries = [
      { id: "1", date: "2025-03-01", visits: 10 },
      { id: "2", date: "2025-03-15", visits: 20 },
    ];

    const result = aggregateTraffic(entries, "month");

    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      date: "2025-03-01",
      visits: 30,
    });
  });

  it("creates separate buckets for different weeks", () => {
    const entries = [
      { id: "1", date: "2025-03-01", visits: 10 },
      { id: "2", date: "2025-03-10", visits: 20 },
    ];

    const result = aggregateTraffic(entries, "week");

    expect(result.length).toBe(2);
  });

  it("returns empty array when no entries", () => {
    const result = aggregateTraffic([], "week");
    expect(result).toEqual([]);
  });

  it("sums visits correctly across multiple entries in same period", () => {
    const entries = [
      { id: "1", date: "2025-04-01", visits: 5 },
      { id: "2", date: "2025-04-02", visits: 15 },
      { id: "3", date: "2025-04-03", visits: 20 },
    ];

    const result = aggregateTraffic(entries, "month");

    expect(result[0].visits).toBe(40);
  });
});
