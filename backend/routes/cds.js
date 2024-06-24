import express from "express";
import { createCDS } from "../controllers/cds.js";
const router = express.Router();

router.get("/");
router.post("/", createCDS);

export default router;
