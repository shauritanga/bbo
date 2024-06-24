import express from "express";
import { createDSE } from "../controllers/dse.js";
const router = express.Router();

router.get("/");
router.post("/", createDSE);

export default router;
