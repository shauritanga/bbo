import mongoose from "mongoose";

const fidelitySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  reference: String,
  value: {
    type: Number,
  },
});

export default mongoose.model("Fidelity", fidelitySchema);
