const mongoose = require('mongoose');
const DATA_BASE = process.env.DATA_BASE;
const connect = ()=>{
mongoose.connect(DATA_BASE,{
        useNewUrlParser:true,
        useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Successfull");
})
.catch((e)=>{
console.log("Fail to connect to database");
})
}

module.exports = connect;