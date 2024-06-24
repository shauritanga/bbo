import express from "express";
import { createFidelity } from "../controllers/fidelity.js";
const router = express.Router();

router.get("/");
router.post("/", createFidelity);

export default router;
