// here we create models and schema for the posts

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String,
},{
    versionKey:false
})

const Postsmodel = mongoose.model('Post', postSchema);

module.exports ={
    Postsmodel
}