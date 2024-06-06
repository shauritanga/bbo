import mongoose from "mongoose";
const receipSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  category: {
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
  chequeNumber: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", receipSchema);
export default Payment;
