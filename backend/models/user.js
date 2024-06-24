import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
});

userSchema.pre("save", async(next) => {
    this.password = await bcrypt.hash(this.password,10)
    next()
});

userSchema.methods.getSignedJwtToken = ()=>{
    
}


export default mongoose.model("User", userSchema);