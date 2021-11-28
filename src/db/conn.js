const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user1:Password@cluster0.lwfdg.mongodb.net/dashboardRegistration?retryWrites=true&w=majority",{
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(e)
})