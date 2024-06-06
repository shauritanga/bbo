import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  checkNumber: {
    type: String,
  },
  method: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
  realAccount: {
    type: String,
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
