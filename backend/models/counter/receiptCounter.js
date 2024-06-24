import mongoose from "mongoose";

const receiptCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const ReceiptCounter = mongoose.model("ReceiptCounter", receiptCounterSchema);

export default ReceiptCounter;
