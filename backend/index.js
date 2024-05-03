import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import customerRoute from './routes/customer.js'
import orderRoute  from './routes/order.js';
import securityRoute from './routes/security.js';
import expenseRoute from './routes/expense.js';
import paymentMethodRoutes from './routes/payment_method.js'
import helmet from 'helmet';
import logger from 'morgan';

const app = express();

const PORT = process.env.PORT || 3000;

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bbo');
console.log("Database is connected!");

} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use(logger('tiny'));
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
});
app.use(cors());
app.use(helmet());

app.use("/api/customers", customerRoute);
app.use("/api/orders", orderRoute);
app.use("/api/securities", securityRoute);
app.use("/api/expenses", expenseRoute);
app.use("/api/paymethods", paymentMethodRoutes);


app.listen(PORT, console.log(`server is running on port ${PORT}`));
