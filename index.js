// here we do all the connections and routes handling

const express = require('express');
const cors = require('cors');
const { connection } = require("./config/db");
const { authentication } = require('./middlewares/authentication.middleware');
const { postrouter } = require('./routes/posts.routes');
const { userrouter } = require('./routes/users.routes');
authentication
const app = express();
app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userrouter)
app.use(authentication)
app.use("/posts", postrouter)

app.listen(process.env.port, async (req, res)=>{
    try {
        await connection
        console.log("Connect success")
    } catch (error) {
        console.log(error);
        res.send({msg: error.message})
    }
    console.log(`Connected to the ${process.env.port}`)
})