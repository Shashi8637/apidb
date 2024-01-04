import express from "express";
import mongoose from "mongoose";

const app = express();

//middleware 
app.use(express.json());


mongoose
   .connect("mongodb://127.0.0.1:27017",{
        dbName:"apidb",
    })
    .then(()=>console.log("database connected"))
    .catch((e)=>console.log(e));

    const schema = mongoose.Schema({
        name:String,
        email:String,
        password:String,
    });
    const User = mongoose.model("User",schema);



app.get("/",(req,res)=>{
    res.send("nice work");
});

app.get("/user/all",async(req,res)=>{
    const users = await User.find({});

    res.json({
        success:true,
        users,
    });
});

app.post("/user/new",async(req,res)=>{
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,

    });


    res.status(201).cookie("temp","lol").json({
        success:true,
        message:"registration succesfull",

    });
});



app.listen(4000,()=>{
    console.log("server is working");
});