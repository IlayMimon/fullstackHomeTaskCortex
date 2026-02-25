import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import express from "express";
import cors from "cors";
import "./config/firebase";
import trafficRoutes from "./routes/trafficEntries.routes";

setGlobalOptions({ maxInstances: 10 });

const app = express();

const allowedOrigins = ["https://fullstackhometaskcortex.web.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use("/trafficEntries", trafficRoutes);

export const trafficEntriesApi = onRequest(app);
