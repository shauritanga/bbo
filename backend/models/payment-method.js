import mongoose from 'mongoose';
const paymentMethodSchema = mongoose.Schema({
    name:{
        type:String
    },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;
