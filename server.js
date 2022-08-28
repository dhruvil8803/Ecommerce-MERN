require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const path = require('path');
const app = express();
const cors = require('cors');
const connect = require('./db.js');
connect();
cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key : process.env.API_KEY,
api_secret: process.env.API_SECRET
});
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use("/api/products", require('./Routes/ProductsCRUD.js'));
app.use("/api/users", require('./Routes/UserCRUD.js'));
app.use("/api/orders", require('./Routes/OrderCRUD.js'));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.listen(PORT, ()=>{
    console.log("Listening to port 5000");
})