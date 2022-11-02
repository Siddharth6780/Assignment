const mongoose = require('mongoose');

const data = new mongoose.Schema({
    A:String,
    B:String,
    C:String,
    D:String,
    E:String,
    isValid:Boolean
})
module.exports=mongoose.model('operator',data)