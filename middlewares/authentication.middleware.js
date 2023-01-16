// here we will authenticate the user
// and give the body a userId too make the connection and protect the routes;
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const authentication = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        // here we will compare the token  and UserID from the post and the login;
        try {
            const decode = jwt.verify(token, process.env.key);
            if(decode){
                console.log(decode.userID)
                req.body.userID = decode.userID
                next()
            }else{
                res.send({msg:"Please login"})
            }
        } catch (error) {
            res.send({msg:"Please login",msg:error})
        }
    }else{
        res.send({msg:"Please login"})
    }
}

module.exports={
    authentication
}