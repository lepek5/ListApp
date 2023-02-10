import * as listItemController from "../controllers/listItemController";
import express from "express";
export const listItemRouter = express.Router();

listItemRouter.post("/:id", (req, res) => {
  try {
    const item = listItemController.createListItem(req.params.id, req.body);
    res.status(200).json(item);
  } catch (error: unknown) {
    return error instanceof Error ? error.message : "Error at Router: Failed to create list item."
  }
})
listItemRouter.delete("/:listId/:id", (req, res) => {
  const item = listItemController.deleteListItem(req.params.listId, req.params.id);
  res.status(200).json(item);
});
listItemRouter.get("/:listId/:id/completed", (req, res) => {
  if (req.params.id === undefined || req.params.listId === undefined) {
    res.status(400).json({ error: "Invalid requst"});
  }
  console.log("router req.params", req.params)
  const item = listItemController.toggleCompleted(req.params.id);
  res.status(200).json(item);
});