const express = require('express');
const router = express.Router();
const Product = require('../Models/Product.js');
const error = require("../Middleware/error");
const {userAuth, adminAuth} = require("../Middleware/Authentication");
const sendResponse = require('../Middleware/sendResponse.js');
const ApiFeatures = require("../Middleware/ApiFeatures.js");
const cloudinary = require("cloudinary");
router.get("/showAllProduct",  error ( async ( req, res, next)=>{
         let data = new ApiFeatures(Product.find(), req.query).search().filter();
         let response1 = await data.query;
        let feature = new ApiFeatures(Product.find(), req.query).search().filter().page(8);
        let response = await feature.query;
        res.send({
            success: true,
            message: "Showing Products",
            response: {response, result: response1.length}
        })
    
}))
router.get("/admin/showAllProduct", userAuth, adminAuth, error(async (req, res,next)=>{
       let data = await Product.find();
       res.send({
           success: true,
           message: "Showing All Product Admin",
           response : data
       })
}))

router.post("/showProduct/:id",  error ( async ( req, res, next)=>{
     
        let response = await Product.findById(req.params.id);
        if(response){
       return res.send({
            success: true,
            message: "Showing Products",
            response: response
        })
    }
    else{
        return  res.send({
            success: false,
            message: "No such product exists"
        })
    }
}))
router.post("/admin/addProduct", userAuth, adminAuth, error ( async ( req, res, next)=>{
    let image = [];
    if(typeof req.body.images === "string"){
        image.push(req.body.images);
    }
    else image = req.body.images;
     let links = [];
          for(let i = 0; i < image.length; i++){
            const mycloud = await cloudinary.v2.uploader.upload(image[i], {
                folder: "Product"
            })
              links.push({
              public_id : mycloud.public_id,
              url : mycloud.secure_url})
        }
         req.body.createdBy = req.id;
         req.body.images = links;
        let product = await Product.create(req.body);
        res.send({
            success: true,
            message: "Product Added",
        })
    
}))
router.put("/admin/updateProduct/:id", userAuth, adminAuth, error ( async ( req, res, next)=>{
     
        let product = await Product.findById(req.params.id);
        if(product){
            if(req.body.images){
                product.images.forEach(async(e)=>{
                    await cloudinary.v2.uploader.destroy(e.public_id);
                })
                let image = [];
         if(typeof req.body.images === "string"){
         image.push(req.body.images);
       }
          else image = req.body.images;
           let links = [];
          for(let i = 0; i < image.length; i++){
            const mycloud = await cloudinary.v2.uploader.upload(image[i], {
                folder: "Product"
            })
              links.push({
              public_id : mycloud.public_id,
              url : mycloud.secure_url})
        }
         req.body.images = links;
            }
        let response = await Product.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true, useFindAndModify: false});
        res.send({
            success: true,
            message: "Product Updated",
        })
    }
    else{
        return res.send({
            success: false,
            message: "No such product exists",
        })
    }
    
}))

router.delete("/admin/deleteProduct/:id", userAuth, adminAuth,  error ( async ( req, res, next)=>{
     
        let product = await Product.findById(req.params.id);
        if(product){
            product.images.forEach(async(e)=>{
                await cloudinary.v2.uploader.destroy(e.public_id);
            })
        let response = await Product.deleteOne({_id: req.params.id});
        res.send({
            success: true,
            message: "Deletion Successfull",
            response: response
        })}
        else{
            res.send({
                success: false,
                message: "No such product exists",}
            );
        }
    
}))
router.post("/addReview", userAuth, error(async(req, res, next)=>{
    const {name, rating, desc} = req.body;
    let product = await Product.findById(req.body.id);
    let reviewPresent = product.reviews.find((rev) => (rev.by.toString() === req.id)); 
    let comment = "";
     if(reviewPresent){
        product.reviews.forEach((rev)=>{
            if(rev.by.toString() === req.id){
                rev.name = name;
                rev.rating = rating,
                rev.desc = desc
            }
        })
        comment = "updated"
     }
     else{
        product.reviews.push({
            by : req.id,
            name,
            rating,
            desc
        })
        product.numberOfReview = product.numberOfReview + 1;
        comment = "added"
     }
     let avg = 0;
     product.reviews.forEach((rev)=>{
        avg += (Number)(rev.rating);
     })
     product.rating = avg / product.numberOfReview;
     await product.save();
     sendResponse(true, `Review ${comment} successfully`, res);
}))

router.get("/showReview/:id", error(async(req, res, next)=>{
    let reviews = await Product.findById(req.params.id);
    res.send({
        success: true,
        message: "Showing Reviews",
        response: reviews.reviews
    })
}))

router.delete("/deleteReview/:id", userAuth, error(async(req, res, next)=>{
    let product = await Product.findById(req.params.id);
    let review = product.reviews.filter((rev)=>(rev.by.toString() != req.id));
    let avg = 0;
    review.forEach((rev)=>{
       avg += (Number)(rev.rating);
    })
    product.rating = (avg !== 0) ? avg / review.length: 0;
    product.reviews = review;
    product.numberOfReview = review.length;
    await product.save();
    sendResponse(true, "Deletion of review Successfull", res);
}))
router.delete("/admin/deleteReviews", userAuth, adminAuth, error(async(req, res, next)=>{
    let product = await Product.findById(req.query.id);
    let review = product.reviews.filter((rev)=>(rev.by.toString() !== req.query.by));
    let avg = 0;
    review.forEach((rev)=>{
       avg += (Number)(rev.rating);
    })
    product.rating = (avg !== 0) ? avg / review.length: 0;
    product.reviews = review;
    product.numberOfReview = review.length;
    await product.save();
    sendResponse(true, "Deletion of review Successfull", res);
}))
module.exports = router;