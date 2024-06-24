import mongoose from "mongoose";

const customerCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CustomerCounter = mongoose.model("CustomerCounter",customerCounterSchema);

export default CustomerCounter;