import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true,
    },
    amount : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        enum : ["expense","income"],
        required : true
    },
    note : {
        type : String
    },
    category : {
        type : String, 
        required : true
    },
    date: {
    type: Date,
    default: Date.now
}

} , { timestamps : true })

export const transactionModel = mongoose.model("Transaction", transactionSchema)