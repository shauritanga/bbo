import mongoose from  "mongoose";
const employeeSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },
    status:{
        type:String
    }
})

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;