import { Router } from "express";
import { trafficEntriesHandler } from "../controllers/trafficEntries.controller";
import { authenticate } from "../middleware/auth";

const trafficRoutes = Router();

trafficRoutes.use(authenticate);

trafficRoutes.all("/", trafficEntriesHandler);

export default trafficRoutes;
