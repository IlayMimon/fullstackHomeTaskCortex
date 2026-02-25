import { Request, Response } from "express";
import * as service from "../services/trafficEntries.service";

export const trafficEntriesHandler = async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      case "GET": {
        const entries = await service.getAll();
        return res.status(200).json(entries);
      }

      case "POST": {
        const newEntry = await service.create(req.body);
        return res.status(201).json(newEntry);
      }

      case "PUT": {
        const { id, ...updateData } = req.body;
        if (!id) return res.status(400).send("Missing entry ID");

        const updated = await service.update(id, updateData);
        return res.status(200).json(updated);
      }

      case "DELETE": {
        const { id } = req.body;
        if (!id) return res.status(400).send("Missing entry ID");

        await service.remove(id);
        return res.status(200).send(`Entry ${id} deleted`);
      }

      default:
        return res.set("Allow", "GET, POST, PUT, DELETE").status(405).send("Method Not Allowed");
    }
  } catch (error) {
    console.error("TrafficEntries Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
