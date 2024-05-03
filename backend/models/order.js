import mongoose from 'mongoose';


const orderSchema = mongoose.Schema({
customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
},
date:{
    type:Date, 
    default:Date.now
},
volume:{
    type:String
},
price:{
    type:String
},
amount:{
    type:String
},
fees:{
    type: Number
},
total:{
    type:Number
},
type:{
    type:String
},
security:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Security"
}
});

const Order = mongoose.model("Order", orderSchema);
export default Order;