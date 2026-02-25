import { Line } from "@ant-design/plots";
import { Button, Card, Col, Modal, Row, Table } from "antd";
import React, { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { trafficEntriesService } from "../services/trafficEntriesService";
import type { TrafficEntry } from "../types/trafficEntry";
import { useColumns } from "../hooks/useColumns";
import generateChartConfig from "../functions/generateChartConfig";
import { aggregateTraffic } from "../functions/aggregateTraffic";
import { AddTrafficEntryForm, type FormValues } from "../components/AddTrafficEntryForm";
import dayjs from "dayjs";

const Home: React.FC = () => {
  const { token, loading: tokenLoading } = useAuth();
  const [trafficData, setTrafficData] = React.useState<TrafficEntry[]>([]);
  const [editRecord, setEditRecord] = React.useState<FormValues>();
  const [chartPeriod, setChartPeriod] = React.useState<"daily" | "weekly" | "monthly">("daily");
  const [trafficLoading, setTrafficLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const loading = tokenLoading || trafficLoading;

  const sortedTrafficData = useMemo(
    () => [...trafficData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [trafficData],
  );
  const weeklyData = useMemo(
    () => aggregateTraffic(sortedTrafficData, "week"),
    [sortedTrafficData],
  );
  const monthlyData = useMemo(
    () => aggregateTraffic(sortedTrafficData, "month"),
    [sortedTrafficData],
  );

  const handleEdit = (record: TrafficEntry) => {
    setEditRecord(
      record && {
        id: record.id,
        date: dayjs(record.date),
        visits: record.visits,
      },
    );
    setModalVisible(true);
  };

  React.useEffect(() => {
    if (!token) return;
    setTrafficLoading(true);
    trafficEntriesService
      .getAll(token)
      .then(setTrafficData)
      .catch((err) => {
        console.error("Failed to fetch traffic entries:", err);
      })
      .finally(() => setTrafficLoading(false));
  }, [token]);

  const columns = useColumns(loading, token, handleEdit, setTrafficData);

  return (
    <>
      <Modal
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditRecord(undefined);
        }}
        footer={null}
      >
        {token && (
          <AddTrafficEntryForm
            trafficData={trafficData}
            token={token}
            closeForm={() => {
              setModalVisible(false);
              setEditRecord(undefined);
            }}
            initialData={editRecord}
            setData={setTrafficData}
          />
        )}
      </Modal>

      <div style={{ paddingBottom: 20 }}>
        <h2>Traffic Dashboard</h2>

        <Row gutter={[0, 16]}>
          {/* TABLE */}
          <Col span={24}>
            <Card title="Traffic Stats" size="small">
              <Row style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => setModalVisible(true)}>
                  Add Record
                </Button>
              </Row>

              <Table
                columns={columns}
                dataSource={[...sortedTrafficData].reverse()}
                loading={trafficLoading}
                pagination={{ pageSize: 10 }}
                size="middle"
                scroll={{ x: true }}
              />
            </Card>
          </Col>

          {/* CHART */}
          <Col span={24}>
            <Card title="Traffic Chart" size="small">
              <Row gutter={[8, 8]} justify="center" style={{ marginBottom: 16 }}>
                <Col>
                  <Button onClick={() => setChartPeriod("daily")}>Daily</Button>
                </Col>
                <Col>
                  <Button onClick={() => setChartPeriod("weekly")}>Weekly</Button>
                </Col>
                <Col>
                  <Button onClick={() => setChartPeriod("monthly")}>Monthly</Button>
                </Col>
              </Row>

              <div style={{ width: "100%", height: 300 }}>
                <Line
                  {...generateChartConfig(
                    chartPeriod === "daily"
                      ? sortedTrafficData
                      : chartPeriod === "weekly"
                        ? weeklyData
                        : monthlyData,
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
