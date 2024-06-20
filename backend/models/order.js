import mongoose from "mongoose";
import OrderCounter from "./orderCounter.js";

const orderSchema = mongoose.Schema({
  orderId:{ type: String, unique: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  volume: {
    type: String,
  },
  price: {
    type: String,
  },
  amount: {
    type: String,
  },
  fees: {
    type: Number,
  },
  total: {
    type: Number,
  },
  type: {
    type: String,
  },
  security: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Security",
  },
  status: {
    type: String,
    default: "new",
  },
  balance: {
    type: Number,
  },
});

orderSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const orderCounter = await OrderCounter.findByIdAndUpdate(
      { _id: "orderId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const seq = String(orderCounter.seq).padStart(5, "0");
    doc.orderId = `AOR${seq}`;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
