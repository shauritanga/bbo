import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import customerRoute from './routes/customer.js'
import orderRoute  from './routes/order.js';
import securityRoute from './routes/security.js';
import expenseRoute from './routes/expense.js';
import paymentMethodRoute from './routes/payment_method.js';
import employeeRoute from './routes/employee.js';
import roleRoute from './routes/role.js';
import receiptRoute from './routes/receipt.js';
import paymentRoute from './routes/payment.js';
import statementRoute from './routes/statement.js';
import logger from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
dotenv.config();

const app = express();



app.use(express.json());
app.use(logger('tiny'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));

app.use(cors());


app.use("/api/payments", paymentRoute);
app.use("/api/customers", customerRoute);
app.use("/api/orders", orderRoute);
app.use("/api/securities", securityRoute);
app.use("/api/expenses", expenseRoute);
app.use("/api/statements", statementRoute);
app.use("/api/paymethods", paymentMethodRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/receipts", receiptRoute);
app.use("/api/roles", roleRoute);



const PORT = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(connect => app.listen(PORT, console.log(`server is running on port ${PORT}`)))
    .catch(error => console.log(error));

