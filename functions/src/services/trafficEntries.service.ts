import { db } from "../config/firebase";
import { TrafficEntry } from "../types/trafficEntry";

const collection = db.collection("trafficStats");

export const getAll = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const create = async (data: TrafficEntry) => {
  const docRef = await collection.add(data);
  return { ...data, id: docRef.id };
};

export const update = async (id: string, data: Partial<TrafficEntry>) => {
  await collection.doc(id).update(data);
  return { ...data, id };
};

export const remove = async (id: string) => {
  await collection.doc(id).delete();
};
