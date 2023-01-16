// here we will create all the routes for thec




const express = require('express');
const bcrypt = require('bcrypt');
const { Postsmodel } = require("../models/posts.model")
const jwt = require("jsonwebtoken");
require("dotenv").config()
const postrouter = express.Router()


postrouter.get('/', async (req, res) => {
    // here we will get the data with the help of the userID
    const userid = req.body.userID;
    const device = req.query.device || ""
    try {
        if(device){
            const posts = await Postsmodel.find({userID: userid, device})
           res.send({posts})
        }else{
        const posts = await Postsmodel.find({userID: userid})
        res.send({posts})
        }
    } catch (error) {
        console.log(error);
        res.send({msg: error})
    }

})


// let create a few post first 
postrouter.post('/create', async (req, res) => {
    const payload = req.body;
    try {
        const post = new Postsmodel(payload);
        await post.save();
        res.send({msg:"Post is created successfully"})
    } catch (error) {
        res.status(404).send({msd:error})
    }
})
// now lets updata the post of user;
postrouter.patch('/update:id', async (req, res) => {
     const id = req.params.id;
     const payload = req.body;
     // get the notes with the id passed here and updata them;
     const posts = await Postsmodel.find({_id: id})
     const posts_id = posts.userID;
     const user_id = req.body.userID;
     try {
        if(posts_id == user_id) {
            await Postsmodel.findByIdAndUpdate({_id: id},payload)
            res.send({msg:"Post is updated successfully"})
        }else{
            res.status(404).send({msd:"you are not allowed to update"})
        }
     } catch (error) {
        console.log(error)
        res.status(500).send({msg:error})
     }
})
postrouter.delete('/delete:id', async (req, res) => {
    const id = req.params.id;
    // get the notes with the id passed here and updata them;
    const posts = await Postsmodel.findOne({_id: id})
    const posts_id = posts.userID;
    const user_id = req.body.userID;
    try {
       if(posts_id == user_id) {
           await Postsmodel.findByIdAndDelete({_id: id})
           res.send({msg:"Post is deleted successfully"})
       }else{
           res.status(404).send({msd:"you are not allowed to delete"})
       }
    } catch (error) {
       console.log(error)
       res.status(500).send({msg:error})
    }
})




module.exports={
    postrouter
}