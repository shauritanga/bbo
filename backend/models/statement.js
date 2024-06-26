import mongoose from "mongoose";
const statementSchema = mongoose.Schema({
    date:{
        type:Date,
        default: Date.now,
    },
    type:{
        type:String,
        required:true,
    },
    reference:{
        type:String,
        required:true,
    },
    particulars:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    debit:{
        type:Number,
        required:true,
    },
    credit:{
        type:Number,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    },

});

const Statement = mongoose.model("Statement", statementSchema);
export default Statement;