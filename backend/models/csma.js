import mongoose from "mongoose";

const csmaSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  reference: String,
  value: {
    type: Number,
  },
});

export default mongoose.model("CSMA", csmaSchema);
