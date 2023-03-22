import express from "express";
import { sse } from "../sse";
export const sseRouter = express.Router();

sseRouter.get("/api/stream", sse.init)
