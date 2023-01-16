// here we will create the user model schema 
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    gender:String,
    password: String
},{
    versionKey: false
})

const Usermodel = mongoose.model("user", userSchema)
module.exports = {
    Usermodel
}