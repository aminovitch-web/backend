const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    brand :{
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        select: false,
    },
    sold: {
        type: Number,
        default: 0,
        select: false,
    },
    images: {
    types: Array,
    },
    color: {
        type: String,
        required: true,
    },
    rating: [{
        star: Number,
        postedBy : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }],


},{timestamps: true });

//Export the model
module.exports = mongoose.model('Product', productSchema);