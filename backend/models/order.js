import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
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
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  security: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Security",
    required: true,
  },
  status: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
