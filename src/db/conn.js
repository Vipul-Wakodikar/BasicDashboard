const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
mongoose.connect(process.env.DATABASE,{
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(e)
})