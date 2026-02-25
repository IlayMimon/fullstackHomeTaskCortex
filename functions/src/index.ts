import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import express, { Request, Response, NextFunction } from "express";
import "./config/firebase";
import trafficRoutes from "./routes/trafficEntries.routes";

setGlobalOptions({ maxInstances: 10 });

const app = express();
const allowedOrigins = ["https://fullstackhometaskcortex.web.app"];

app.options("*", (req: Request, res: Response) => {
  console.log("Received CORS preflight request from origin:", req.headers.origin);
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  return res.sendStatus(403);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Received CORS preflight request from origin:", req.headers.origin);
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
});

app.use(express.json());
app.use("/trafficEntries", trafficRoutes);

export const trafficEntriesApi = onRequest(app);
