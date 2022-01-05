const mongoose = require("mongoose");

const url = "mongodb+srv://Blogdb:Blog123@cluster0.xyb9h.mongodb.net/Blogdb?retryWrites=true&w=majority"

// url = "mongodb://localhost:27017/blogdb"

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=>{
    console.log("connection successful");
}).catch((error)=>{
    console.log(error);
})