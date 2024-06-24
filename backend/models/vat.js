import mongoose from "mongoose";

const vatSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  reference: String,
  value: {
    type: Number,
  },
});

export default mongoose.model("VAT", vatSchema);
