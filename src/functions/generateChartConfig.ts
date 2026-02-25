import type { TrafficEntry } from "../types/trafficEntry";

const generateChartConfig = (trafficData: Partial<TrafficEntry>[]) => {
  return {
    data: trafficData,
    xField: "date",
    yField: "visits",
    autoFit: true,
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
};

export default generateChartConfig;
