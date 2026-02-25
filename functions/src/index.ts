import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import express from "express";
import "./config/firebase";
import trafficRoutes from "./routes/trafficEntries.routes";

setGlobalOptions({ maxInstances: 10 });

const app = express();

const allowedOrigins = ["https://fullstackhometaskcortex.web.app"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  return next();
});

app.use(express.json());
app.use("/trafficEntries", trafficRoutes);

export const trafficEntriesApi = onRequest(app);
