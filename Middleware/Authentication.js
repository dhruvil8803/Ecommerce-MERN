const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const error = require("./error");
const User = require('../Models/User');
userAuth = error(async (req, res, next) =>{
    const {authtoken} = req.headers;
     if(!authtoken) return res.send({
        success : false,
        message: "Login or Register first"
     })
      let response = jwt.verify(authtoken, SECRET_KEY);
      req.id = response.id;
      next();
})
adminAuth = error(async (req, res, next)=>{
    let response = await User.findById(req.id);
    if(response.role !== "admin") return res.send({
        success:false,
        message: "User are not permitted to access this data"
    })
    next();
})
module.exports = {
    userAuth,
    adminAuth
}