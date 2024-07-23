import mongoose from "mongoose";  


const stockSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
    }, 
    symbol:{
        type: String, 
        required: true,
    }, 
    price:{
        type: Number, 
        required: true, 
    }, 
    change:{
        type: Number,
        required: true,
    }, 
    volume:{
        type: Number, 
        required: true,
    }, 
},{
    timestamps: true,
}); 

export default mongoose.model('Stock', stockSchema);