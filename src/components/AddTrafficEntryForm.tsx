import { Button, DatePicker, Form, InputNumber, Space, Typography } from "antd";
import type { TrafficEntry } from "../types/trafficEntry";
import dayjs from "dayjs";
import { trafficEntriesService } from "../services/trafficEntriesService";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

const { Title } = Typography;

interface AddTrafficEntryFormProps {
  trafficData: TrafficEntry[];
  token: string;
  closeForm: () => void;
  initialData?: FormValues;
  setData: Dispatch<SetStateAction<TrafficEntry[]>>;
}

export interface FormValues {
  id: TrafficEntry["id"];
  date: dayjs.Dayjs;
  visits: TrafficEntry["visits"];
}

export const AddTrafficEntryForm = ({
  trafficData,
  token,
  closeForm,
  initialData,
  setData,
}: AddTrafficEntryFormProps) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const disabledDates = trafficData.map((entry) => dayjs(entry.date));

  const onFinish = async () => {
    setLoading(true);
    const values = await form.validateFields();
    if (initialData) {
      const updateResponse = await trafficEntriesService.update(
        initialData.id,
        {
          visits: values.visits,
        },
        token,
      );
      if (updateResponse.status === 200) {
        setData((prevData) =>
          prevData.map((entry) =>
            entry.id === initialData.id ? { ...entry, visits: values.visits } : entry,
          ),
        );
      }
    } else {
      const createResponse = await trafficEntriesService.create(
        { ...values, date: dayjs(values.date).format("YYYY-MM-DD") },
        token,
      );
      if (createResponse.status === 201) {
        setData((prevData) => [...prevData, createResponse.data]);
      }
    }
    closeForm();
    setLoading(false);
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        date: initialData.date ? dayjs(initialData.date) : undefined,
        visits: initialData.visits,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  return (
    <Form form={form} disabled={loading} onFinish={onFinish} layout="vertical">
      <Title level={4} style={{ marginBottom: 16 }}>
        {initialData ? "Edit" : "Add"} Traffic Record
      </Title>

      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please enter a date" }]}
      >
        <DatePicker
          format={"YYYY-MM-DD"}
          disabled={!!initialData}
          disabledDate={(current) => disabledDates.some((date) => date.isSame(current, "day"))}
        />
      </Form.Item>

      <Form.Item
        name="visits"
        label="Visits"
        rules={[{ required: true, message: "Please enter number of visits" }]}
      >
        <InputNumber min={0} placeholder="0" />
      </Form.Item>

      <Space size="middle" style={{ marginTop: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {!initialData && <Button onClick={() => form.resetFields()}>Reset</Button>}
      </Space>
    </Form>
  );
};
