import mongoose from "mongoose";

const dseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  reference: String,
  value: {
    type: Number,
  },
});

export default mongoose.model("DSE", dseSchema);
