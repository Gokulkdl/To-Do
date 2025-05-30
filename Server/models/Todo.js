
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,
    },
     status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    priority:{
        type:String,
        enum: ['Low', 'Medium', 'High'],
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});


export default mongoose.model("Todo", todoSchema)