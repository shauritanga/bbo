import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name:{
        type:String
    },
    manager:{
        type:String
    },
    status:{
        type:String
    },
    description:{
        type:String
    }
});

const Category = mongoose.model("Category", schema);
export default Category;