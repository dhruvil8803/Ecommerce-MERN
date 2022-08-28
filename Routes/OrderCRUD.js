const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.js');
const User = require('../Models/User.js');
const error = require("../Middleware/error");
const {userAuth, adminAuth} = require("../Middleware/Authentication");
const sendResponse = require('../Middleware/sendResponse.js');
let Order = require("../Models/Order.js");
let updateProduct = async (id, quantity)=>{
    let product = await Product.findById(id);
    if(!product) return;
    product.stock = Math.max(0, product.stock - quantity);
    await product.save();
}
router.post("/addOrder", userAuth, error(async(req, res, next) => {
       let {shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body;
       let by = req.id;
       let order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice,by
       })
       sendResponse(true, "Order placed successfully", res);
}))

// show all order admin
router.get("/admin/showAllOrder", userAuth, adminAuth, error(async(req, res, next)=>{
    let response = await Order.find();
    res.send({
        success: true,
        message: "Showing all orders",
        response
    })
}))

router.get("/showAllOrder", userAuth, error(async(req, res, next)=>{
    let response = await Order.find({by : req.id});
    res.send({
        success: true, 
        message: "Showing all your orders",
        response
    })
}))

router.get("/showOrder/:id", userAuth, error(async(req,res, next)=>{
    let response = await Order.findById(req.params.id);
    res.send({
        success: true, 
        message: "Showing order",
        response
    })
}))

router.put("/admin/updateStatus/:id", userAuth, adminAuth, error(async(req, res, next)=>{
     let response = await Order.findById(req.params.id);
     if(!response) sendResponse("false", "Order Removed already", res);
     if(response.orderStatus === "Delivered") return sendResponse(false, "Product already delivered cant change status", res);
     if(response.orderStatus === "Processing"){
        response.orderStatus = "Shipped",
        await response.save();
        sendResponse(true, "Order Updated Successfully", res);
        return;
     }
     response.orderItems.forEach(async (order)=>{
         await updateProduct(order.product, order.quantity);
     })
     response.orderStatus = "Delivered";
     response.deliveredAt = Date.now();
     let revenue = response.totalPrice;
     await response.save();
    res.send({
        success: true,
        message: "Status Updation Successfull",
        response : revenue,
    })
}))

router.delete("/deleteOrder/:id", userAuth, error(async (req, res, next)=>{
     let response = await Order.findById(req.params.id);
     if(response.orderStatus === "Delivered") return sendResponse(false, "Order already been delivered cant cancel it now", res);
     await Order.deleteOne({_id: req.params.id});
     sendResponse(true, "Order deleted successfully", res);
}))

module.exports = router;
