import express from "express";
import { createCSMA } from "../controllers/csma.js";
const router = express.Router();

router.get("/");
router.post("/", createCSMA);

export default router;
