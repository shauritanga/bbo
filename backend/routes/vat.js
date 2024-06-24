import express from "express";
import { createVAT, getVAT, getVATMonthly } from "../controllers/vat.js";
const router = express.Router();

router.get("/", getVAT);
router.get("/montly", getVATMonthly);
router.post("/", createVAT);

export default router;
