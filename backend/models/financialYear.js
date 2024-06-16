import mongoose from "mongoose";
const financialSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  status: String,
});
const Financial = mongoose.model("Financial", financialSchema);
export default Financial;
