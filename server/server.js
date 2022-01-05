const path = require("path");
const express = require("express");
const articleRouter = require("../router/articles");
const userRouter = require('../router/users')
const methodOverride = require("method-override")
const ejs =require("ejs");
const bodyparser = require("body-parser");
const exp = require("constants");
require("../src/db/conn");
const Articles =require("../src/model/article")
const Users = require("../src/model/user");
const app = express();
const port = process.env.PORT || 5000;



// app.use(bodyparser.urlencoded({extended:true}));



app.use(express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use(express.static(path.join(__dirname,"../public")));
app.use('/img',express.static(path.join(__dirname,"../assets/img")));
app.use(express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use(express.static(path.join(__dirname,"../public/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/jq")));


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))

// view path
// const viewspath =path.join(__dirname,"../public");
app.set("view engine","ejs");
// app.set("views",viewspath);






// template engin route
app.get("/",async (req,res)=>{
    const articles = await Articles.find().sort({
        createdAt: 'desc'})
    res.render("index",{articles: articles });
});





app.get("/about",(req,res)=>{
    
    res.render("about",);
});
app.get("/contact",(req,res)=>{
    res.render("contact");
});
app.get("/post",(req,res)=>{
    res.render("post");
});

// app.get("/loginsingup",(req,res)=>{
//     res.render("loginsingup");
// });

app.use("",userRouter)


// blog Router
app.use("/articles",articleRouter);


app.listen(port,()=>{
    console.log(`lis ${port}`);
});