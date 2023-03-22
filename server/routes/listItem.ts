import * as listItemController from "../controllers/listItemController";
import express from "express";
import { sse } from "../sse";
export const listItemRouter = express.Router();

listItemRouter.post("/api/:id", (req, res) => {
  try {
    const item = listItemController.createListItem(req.params.id, req.body);
    res.status(200).json(item);
    //sse.send("from router create", req.params.id);
  } catch (error: unknown) {
    return error instanceof Error ? error.message : "Error at Router: Failed to create list item."
  }
})
listItemRouter.delete("/api/:listId/:id", (req, res) => {
  const item = listItemController.deleteListItem(req.params.listId, req.params.id);
  res.status(200).json(item);
  //sse.send("from router delete", req.params.listId);
});
listItemRouter.get("/api/:listId/:id/completed", (req, res) => {
  if (req.params.id === undefined || req.params.listId === undefined) {
    res.status(400).json({ error: "Invalid requst"});
  }
  const item = listItemController.toggleCompleted(req.params.listId, req.params.id);
  res.status(200).json(item);
});