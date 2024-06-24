import express from "express";
import {
  createExecution,
  getAllExecutions,
  getExecution,
} from "../controllers/execution.js";
const router = express.Router();

router.get("/", getAllExecutions);
router.get("/:id", getExecution);
router.post("/", createExecution);

export default router;
