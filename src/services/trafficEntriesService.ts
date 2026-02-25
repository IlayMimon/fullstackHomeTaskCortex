import axios, { type AxiosResponse } from "axios";
import type { TrafficEntry } from "../types/trafficEntry";

const trafficEntriesEndpoint = `${import.meta.env.VITE_API_BASE_URL}/trafficEntries`;

export const trafficEntriesService = {
  async getAll(token: string): Promise<TrafficEntry[]> {
    return axios
      .get(trafficEntriesEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) =>
        res.data.sort(
          (a: TrafficEntry, b: TrafficEntry) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      );
  },

  async create(
    data: Omit<TrafficEntry, "id">,
    token: string,
  ): Promise<AxiosResponse<TrafficEntry>> {
    return axios
      .post(trafficEntriesEndpoint, data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => res);
  },

  async update(
    id: TrafficEntry["id"],
    data: Partial<TrafficEntry>,
    token: string,
  ): Promise<AxiosResponse<TrafficEntry>> {
    return axios
      .put(
        trafficEntriesEndpoint,
        { id, ...data },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true },
      )
      .then((res) => res);
  },

  async delete(id: TrafficEntry["id"], token: string): Promise<AxiosResponse["status"]> {
    return axios
      .delete(trafficEntriesEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
        data: { id },
      })
      .then((res) => res.status);
  },
};
