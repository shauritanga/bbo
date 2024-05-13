import mongoose from 'mongoose';
const receipSchema = mongoose.Schema({
    date:{
        type:Date,
        default: Date.now
    },
    payee:{
        type:String
    },
    category:{
        type:String 
    },
    method:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PaymentMethod"
    },
    realAccount:{
        type:String
    },
    amount:{
        type:Number
    },
    reference:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String
    }
});

const Receipt = mongoose.model("Receipt", receipSchema);
export default Receipt;