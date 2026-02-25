import { Button, Space } from "antd";
import type { TrafficEntry } from "../types/trafficEntry";
import { trafficEntriesService } from "../services/trafficEntriesService";
import { dropDownDateRange } from "../components/ColumnFilters";
import { onDateFilter } from "../functions/columnFunctions";
import { useState, type Dispatch, type SetStateAction } from "react";

export const useColumns = (
  loading: boolean,
  token: string | null,
  onEdit: (record: TrafficEntry) => void,
  setData: Dispatch<SetStateAction<TrafficEntry[]>>,
) => {
  const [deletingRecordId, setDeletingRecordId] = useState<string>();

  const handleDelete = async (id: TrafficEntry["id"]) => {
    if (!loading && token) {
      setDeletingRecordId(id);
      const deletionResponse = await trafficEntriesService.delete(id, token);
      if (deletionResponse === 200) {
        setData((prevData) => prevData.filter((entry) => entry.id !== id));
      }
      setDeletingRecordId(undefined);
    }
  };

  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: TrafficEntry, b: TrafficEntry) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      filterDropdown: dropDownDateRange,
      onFilter: (value: boolean | React.Key, record: TrafficEntry) => onDateFilter(value, record),
    },
    {
      title: "Visits",
      dataIndex: "visits",
      key: "visits",
      sorter: (a: TrafficEntry, b: TrafficEntry) => a.visits - b.visits,
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_: unknown, record: TrafficEntry) => (
        <Space>
          <Button
            size="small"
            onClick={() => onEdit(record)}
            disabled={deletingRecordId === record.id}
          >
            Edit
          </Button>
          <Button
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
            disabled={deletingRecordId === record.id}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
};
