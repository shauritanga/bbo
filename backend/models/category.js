import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  default: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model("Category", schema);
export default Category;
