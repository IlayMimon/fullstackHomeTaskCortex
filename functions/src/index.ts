import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import express from "express";
import cors from "cors";
import "./config/firebase";
import trafficRoutes from "./routes/trafficEntries.routes";

setGlobalOptions({ maxInstances: 10 });

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use("/trafficEntries", trafficRoutes);

export const trafficEntriesApi = onRequest(app);
