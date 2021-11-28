const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product : {
        type: String,
        required:true,
        unique:true
    },
    price : {
        type: String,
        required:true
    },
    avatar : {
        type: String,
        required:true
    }
})
const Productadmin = new mongoose.model("Productadmin",productSchema);
module.exports = Productadmin;