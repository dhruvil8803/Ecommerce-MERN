const mongoose = require('mongoose');
const schema = new mongoose.Schema({
   name: {
    type: String,
    required : [true, "Name of product is required"],
    trim : true
   },
   desc : {
    type: String,
    required: [true, "Descreption of product is required"],
    trim: true
   },
   price :{
    type: Number,
    maxLength: [8, "Maximum price of product you can add is 10000000"] ,
    required: true
   },
   rating:{
    type: Number,
    default: 0
   },
   images:[{
    public_id: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
   }
   ],
   category:{
    type: String,
    required: true
   },
   stock:{
    type: Number,
    maxLength: [4, "Max items you can add is 1000"],
    default: 1
   },
   createdBy:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
   },
   numberOfReview:{
    type: Number,
    default: 0
   },
   reviews:[
    {   
         by:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
       },
        name:{
            type: String,
            required: true,
            trim: true
        },
        rating:{
            type: Number,
            required: true
           },
        desc:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now 
        }
    }
   ],
   date: {
    type: Date,
    default: Date.now
   }
});

module.exports = new mongoose.model("Product", schema);