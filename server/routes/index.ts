import express from "express";
const ListRouter = express.Router();
import * as listController from "../controllers";

ListRouter.put("/api/:id", async (req: any, res) => {
  try {
    const list = await listController.updateList(req.params.id, req.list);
    res.status(200).json(list);
  } catch (error: unknown) {
    res.status(400).json(error instanceof Error ? error.message : `Error fetching list id ${req.list.listId}`);
  }
});
ListRouter.get("/api/:id", async (req, res) => {
  try {
    const list = await listController.getListById(req.params.id);
    res.status(200).json(list);
  } catch (error: unknown) {
    res.status(400).json(error instanceof Error ? error.message : `Error fetching list id ${req.params.id}`);
  }
});
ListRouter.post("/api", async (req: any, res) => {
  try {
    const list = await listController.createList(req.list);
    res.status(200).json(list);
  } catch (error: unknown) {
    res.status(400).json(error instanceof Error ? error.message : `Error creating list id ${req.list.listId}`);
  }
})

export default ListRouter;