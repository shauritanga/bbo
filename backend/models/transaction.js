import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["expense", "payment"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Optional
  payee: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // For expenses
  method: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod" }, // e.g., 'cash', 'credit card', 'check'
  referenceNumber: String, // (Optional, e.g., check number)
  status: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
