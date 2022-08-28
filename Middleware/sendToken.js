const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY_EXPIRE = process.env.SECRET_KEY_EXPIRE;
module.exports = (data, message, res)=>{
    let authtoken = jwt.sign(data, SECRET_KEY,{
        expiresIn: SECRET_KEY_EXPIRE
    });
    res.send({
        success: true,
        authtoken : authtoken,
        message: message
    })
}