import express from "express";
import { createBrokerage } from "../controllers/brokerage.js";
const router = express.Router();

router.get("/");
router.post("/", createBrokerage);

export default router;
