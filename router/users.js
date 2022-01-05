const express = require('express');
const res = require('express/lib/response');
const User = require('../src/model/user');

const router =express.Router()

router.get("/login",(req,res)=>{
    res.render("loginsingup");
});

router.get("/singup",(req,res)=>{
    res.render("singup")
})

router.post("/users",async (req,res)=>{
    const {name,email,password,confirmpassword} = req.body ;
    const user = new User({name,email,password,confirmpassword })
    try{
        if(password ==confirmpassword){
        // console.log(user)
        await user.save()
        res.redirect("/login")
        } else {
            res.send("password does not match")
        }
    }catch(error){
        console.log(error)
    res.redirect("/singup")
    }
})

// login
router.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body ;
        
     const userEmail =  await  User.findOne({email: email})
       if(userEmail.password == password){
           res.redirect("/")
       }else{
           res.send("invalid login details")
       }

    } catch (error) {
        res.status(400).send("invalid login details")
    }
})



module.exports = router