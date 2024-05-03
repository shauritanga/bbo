import mongoose from 'mongoose';
const expenseSchema = mongoose.Schema({
    date:{
        type:Date,
        default: Date.now
    },
    payee:{
        type:String
    },
    checkNumber:{
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
    description:{
        type:String
    }
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;