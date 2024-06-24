import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import customerRoute from "./routes/customer.js";
import orderRoute from "./routes/order.js";
import securityRoute from "./routes/security.js";
import expenseRoute from "./routes/expense.js";
import paymentMethodRoute from "./routes/payment_method.js";
import employeeRoute from "./routes/employee.js";
import roleRoute from "./routes/role.js";
import receiptRoute from "./routes/receipt.js";
import paymentRoute from "./routes/payment.js";
import statementRoute from "./routes/statement.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import authRoute from "./routes/auth.js";
import emailRoute from "./routes/email.js";
import financialYearRoute from "./routes/financialYear.js";
import reportsRoute from "./routes/reports.js";
import categoryRoute from "./routes/category.js";
import logger from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import passport from "passport";
import errorHandler from "./middleware/error.js";
import dseRoute from "./routes/dse.js";
import cdsRoute from "./routes/cds.js";
import csmaRoute from "./routes/csma.js";
import vatRoute from "./routes/vat.js";
import brokerageRoute from "./routes/brokerage.js";
import fidelityRoute from "./routes/fidelity.js";
import executionRoute from "./routes/execution.js";
dotenv.config();

import { protect } from "./middleware/auth.js";

const app = express();
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(express.json());
app.use(logger("tiny"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.options("/api/financial-years", cors());

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/activate", (req, res) => {
  //getting email and token from the link
  const { email, token } = req.query;
  //checking if email and token are present
  if (email && token) {
    //checking if token is valid
    //updating user table to make verified true
    console.log("email and token are present");
  } else {
    res.status(400).send("Invalid request");
  }
});
app.use("/api/v1/auth", authRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/reports", reportsRoute);
app.use("/api/emails", emailRoute);
app.use("/api/transactions", transactionRoutes);
app.use("/api/customers", customerRoute);
app.use("/api/orders", orderRoute);
app.use("/api/securities", securityRoute);
app.use("/api/expenses", expenseRoute);
app.use("/api/statements", statementRoute);
app.use("/api/financial-years", financialYearRoute);
app.use("/api/paymethods", paymentMethodRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/receipts", receiptRoute);
app.use("/api/roles", roleRoute);
app.use("/api/v1/executions", executionRoute);

//Fees
app.use("/api/v1/dse", dseRoute);
app.use("/api/v1/cds", cdsRoute);
app.use("/api/v1/csma", csmaRoute);
app.use("/api/v1/vat", vatRoute);
app.use("/api/v1/brokerage", brokerageRoute);
app.use("/api/v1/fidelity", fidelityRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then((connect) =>
    app.listen(PORT, console.log(`server is running on port ${PORT}`))
  )
  .catch((error) => console.log(error));
