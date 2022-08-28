const express = require('express');
const router = express.Router();
const User = require("../Models/User.js");
const bcrypt = require("bcryptjs");
const error = require("../Middleware/error");
const sendToken = require("../Middleware/sendToken");
const crypto = require('crypto')
const sendMail = require("../Middleware/sendEmail.js")
const sendResponse = require('../Middleware/sendResponse.js');
const {userAuth, adminAuth} = require("../Middleware/Authentication");
const cloudinary = require("cloudinary");
const validator = require('validator');
const validateEmail = (email)=>{
    return validator.isEmail(email);
}
const validateName = (name)=>{
  return validator.isAlpha(name);
}
router.post("/register", error(async ( req, res, next)=>{
    let {name, email, password, avatar} = req.body;
        let response = await User.findOne({email : email});
        if(response){
           return sendResponse(false, "Someone with this email exists please login instead", res);
        }
        let public_id = process.env.PUBLIC_ID;
        let secure_url = process.env.SECURE_URL;
            if(!validateEmail(email)) return sendResponse(false, "Enter Valid Email", res);
            if(!validateName(name)) return sendResponse(false, "Enter Valid Name", res);
            if(password.length < 8) return sendResponse(false, "Password must contain atleast 8 characters", res);
             password =  await bcrypt.hash(password, 10);
             if(avatar){
             const mycloud = await cloudinary.v2.uploader.upload(avatar, {
               folder: "Avtar",
               width: 150,
               crop: 'scale',
             })
             public_id = mycloud.public_id;
             secure_url = mycloud.secure_url;
            }
            let user = await User.create({
                name,email, password,
                avatar:{
                    public_id: public_id,
                    url: secure_url 
                }
            })
            sendToken({id: user._id}, "Regestration Successfull", res);
}))

router.post("/login", error(async ( req, res, next)=>{
    const {email, password} = req.body;
    const response = await User.findOne({email: email});
    if(!response)  return sendResponse(false, "Invalid Credantials", res);
         const check = await bcrypt.compare(password, response.password);
         if(!check) return sendResponse(false, "Invalid Credantials", res);


            sendToken({id: response._id}, "Login Successfull", res);
         
}))
router.get("/logout", error(async( req, res, next)=>{
    res.send({
        success : true,
        message: "Logout Successfull"
    })
}))

router.post("/forgetPassword", error(async (req, res, next)=>{
      let user = await User.findOne({email : req.body.email});
      if(!user) res.send({
        success: false,
        message : "User not found"
      })
       let resetToken = crypto.randomBytes(20).toString("hex");
       const tokenCrypto = crypto.createHash("sha256").update(resetToken).digest("hex");
       const tokenExpire = Date.now() + 15 * 60 * 1000;
       const resetURL = `${process.env.DOMAIN_NAME}changePassword/${resetToken}`
       const message = `<body><h1>Ecommerce</h1><br><p>Please click on the link below to create new password<br> <a href=${resetURL}>${resetURL}</a></p><br>
       <p style="color: red; font-weight: bold;">Note: The Link will expire in 15min of generating it please be quick to generate new password</p></body>`;
       try{
        await sendMail({
            email: user.email,
            subject: "Ecommerce Password reset",
            message: message,
        })
        user.resetPasswordToken = tokenCrypto;
        user.resetPasswordExpire = tokenExpire;
        await user.save();
        sendResponse(true, `Reset password token send to email id ${user.email}, Please check in the spam section if you don't find the mail.`, res);
       }
       catch(e){
        sendResponse(false, e.message, res);
           user.resetPasswordToken = undefined;
           user.resetPasswordExpire = undefined;
           await user.save();
       }
}))
router.post("/resetPassword/:resetToken" , error(async (req, res, next)=>{
    const tokenCrypto = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    let user = await User.findOne({
        resetPasswordToken : tokenCrypto,
        resetPasswordExpire : {
            $gt: Date.now()
        }
    })
    if(!user) return sendResponse(false, "Reset Token in invalid or Token is expired", res);
    if(req.body.password.length < 8) return sendResponse(false, "Password must be of 8 characters", res);
    if(req.body.password !== req.body.confirmPassword) return sendResponse(false, "Password and Confirm Password must be same", res);
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken({id: user._id}, "Password Changed successfully and you are Loggined", res);
}))

router.get("/showUser", userAuth, error(async(req, res, next)=>{
    const response = await User.findById(req.id);
    res.send({
        success: true,
        message: "Showing User details",
        response
    })
}))

router.get("/userImage/:id", error(async(req, res, next)=>{
    const response = await User.findById(req.params.id);
    if(!response) return res.send(false, "User Not found", res);
    res.send({
        success: true,
        message : "Showing User Image",
        response : {
            name: response.name,
            avatar: response.avatar,
        },
    })
}))
router.get("/admin/showAllUser", userAuth, adminAuth, error(async(req,res, next)=>{
    const response = await User.find();
    res.send({
        success: true,
        message: "Showing all users",
        response
    })
}))
router.get("/admin/showUser/:id", userAuth, adminAuth, error(async(req,res, next)=>{
    const response = await User.findById(req.params.id);
    res.send({
        success: true,
        message: "Showing user",
        response
    })
}))

router.put("/changePassword", userAuth, error(async(req, res,next)=>{
    const response = await User.findById(req.id);
    const check = await bcrypt.compare(req.body.password, response.password);
    if(!check) return sendResponse(false, "Enter valid old password", res);
    if(req.body.newPassword.length < 8) return sendResponse(false, "New Password must have length greater than or equal to 8", res);
    if(req.body.newPassword !== req.body.confirmPassword) return sendResponse(false, "New password and confirm password must be same", res);
    response.password = await bcrypt.hash(req.body.newPassword, 10),
    await response.save();
    sendResponse(true, "Password changed successfully", res);
}))

router.put("/updateProfile", userAuth, error(async(req, res, next)=>{
    const {name, email} = req.body;
    let response = await User.findByIdAndUpdate(req.id , {name, email},{new: true, runValidators: true, useFindAndModify: false});
    res.send({
       success : true,
       message: "Profile updated successfully",
       response
    })
}))

router.put("/updateAvatar", userAuth, error(async(req, res, next)=>{
    let {avatar} = req.body;
    let response = await User.findById(req.id);
    if(response.avatar.public_id !== process.env.PUBLIC_ID){
    await cloudinary.v2.uploader.destroy(response.avatar.public_id);
    }
    const mycloud = await cloudinary.v2.uploader.upload(avatar ,{
        folder: "Avtar",
        width: 150,
        crop: 'scale',
      })
       avatar = {
        public_id : mycloud.public_id,
        url : mycloud.url
      }
     response = await User.findByIdAndUpdate(req.id , {avatar},{new: true, runValidators: true, useFindAndModify: false});
    res.send({
       success : true,
       message: "Image updated successfully",
       response
    })
}))
router.put("/admin/updateRole/:id", userAuth, adminAuth, error(async(req, res, next)=>{
    const {role} = req.body;
    let response = await User.findByIdAndUpdate(req.params.id , {role},{new: true, runValidators: true, useFindAndModify: false});
    res.send({
       success : true,
       message: "Role updated successfully",
       response
    })
}))

router.delete("/admin/deleteUser/:id", userAuth, adminAuth, error(async(req, res,next)=>{
    let user = await User.findById(req.params.id);
    if(user.avatar.public_id !== process.env.PUBLIC_ID){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    let response = await User.deleteOne({_id: req.params.id});
    sendResponse(true, "User Deleted", res);
}))
module.exports = router;