import mongoose from "mongoose";
import { hash, compare } from "bcrypt";

const customerSchema = mongoose.Schema({
  account: {
    type: String,
  },
  name: {
    type: String,
  },
  bankName: {
    type: String,
  },
  category: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  idType: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

customerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
