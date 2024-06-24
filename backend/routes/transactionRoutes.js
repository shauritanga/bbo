// transactionRoutes.js
import express from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionByCustomerId,
  updateTransaction,
} from "../controllers/transactionController.js";
// Import other controllers

const router = express.Router();
//router.use(passport.authenticate("local", { session: false }));
router.get("/customer/:id", getTransactionByCustomerId);
router.post("/", createTransaction);
router.get("/", getAllTransactions);
router.patch("/:id", updateTransaction);
// Add routes for other actions (GET, PATCH, DELETE)

export default router;
