import express from "express";
import Expense from "../models/expense.js";
import { getAllExpenses, getExpenseMonthly } from "../controllers/expense.js";
const route = express.Router();

route.get("/monthly", getExpenseMonthly);

route.get("/all", getAllExpenses);

route.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const expenses = await Expense.find({}, { __v: 0 })
      .populate("payee")
      .skip(skip)
      .limit(limit);

    const totalDocuments = await Expense.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      data: expenses,
      currentPage: page,
      totalPages: totalPages,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post("/", async (req, res) => {
  const expense = Expense({
    ...req.body,
  });
  await expense.save();
  res.send({ message: "Success" });
});

route.get("/:id", async (req, res) => {
  const expense = await Expense.find({ _id: req.params.id });
  res.send(expense);
});

route.post("/:id", async (req, res) => {
  const response = await Expense.updateOne(
    { _id: req.params.id },
    { ...req.body }
  );
  res.send(response.acknowledged);
});

route.delete("/:id", async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);
  res.send(expense);
});

const expenseRoute = route;

export default expenseRoute;
