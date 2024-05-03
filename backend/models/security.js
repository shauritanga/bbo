import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name:{
        type:String
    },
    number:{
        type:String
    },
    price:{
        type:Number
    },
});

const Security = mongoose.model("Security", schema);
export default Security;