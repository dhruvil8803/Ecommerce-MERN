const validator = require('validator');
const mongoose = require('mongoose');
const validateEmail = (email)=>{
    return validator.isEmail(email);
}
const validateName = (name)=>{
  return validator.isAlpha(name);
}
const schema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        minLength: [2, "Name must have minimum 2 characters"],
        maxLength: [20, "Name should be shorter than 20 characters"],
        trim: true,
        validate: [validateName, "Enter valid name"]
    },
    email:{
        type: String,
        required : true,
       validate: [validateEmail, "Enter valid email"],
       unique: true
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    date:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken : String,
    resetPasswordExpire: String,
})

module.exports = new mongoose.model("User", schema);