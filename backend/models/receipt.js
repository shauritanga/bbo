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
        type:String
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
    }
});

const Receipt = mongoose.model("Receipt", expenseSchema);
export default Receipt;