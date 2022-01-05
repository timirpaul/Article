const express = require ('express');
const req = require('express/lib/request');
const { render } = require('express/lib/response');
const res = require('express/lib/response');

// const { route } = require('express/lib/router');
const Article = require("../src/model/article");
require("../src/db/conn");
const router = express.Router();
// const path = require('path');

router.get('/new',(req,res)=>{
    res.render("new",{article : new Article() });
})

router.get('/edit/:id',async (req,res)=>{
    try{
    const article = await Article.findById(req.params.id)
    res.render("edit",{article : article})
    }catch(e){
            res.redirect("/")
    }
})

router.get('/:slug',async (req,res)=>{
   const article = await Article.findOne( {slug:req.params.slug})
   if(article == null) {res.redirect('/')}
   res.render('show',{article: article})
})



router.post('/', async (req,res)=> { 
    // const {title, description}= req.body;
 
    let article =new Article({
        title : req.body.title,
        description : req.body.description})
    try {
        article = await article.save()
        console.log(article.title)
        res.redirect(`articles/${article.slug}`)
        
    } catch (error){
        console.log(error)
        res.render("new",{article: new Article() })
    }
})

// router.post('/', async (req,res,next)=>{
//     req.article = new Article()
//     next()
// },saveArticleAndRedirect('new'))

// router.put("/:id",async (req,res,next)=>{
//     req.article = await Article.findById(req.params.id)
//     console.log(req.params.id)
//     next()
// },saveArticleAndRedirect('edit'))

router.put('/:id', async (req,res)=> { 
    req.article = await Article.findById(req.params.id)
     let article = req.article
    article.title = req.body.title
    article.description = req.body.description
try {
    article = await article.save()
    console.log(article.title)
    res.redirect(`${article.slug}`)
    
} catch (error){
    res.render("new",{article: article })
}

})






router.delete("/:id",async (req,res)=>{
    console.log(req.params.id)
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// function saveArticleAndRedirect (path) {
//     return async (req,res)=>{
//         let article = req.article 
//         // const {title, description}= req.body.;

//         article.title = req.body.title
//         article.description = req.body.description
//         try {
//             article = await article.save()
//             res.redirect(`articles/${article.slug}`)
            
//         } catch (error){
//             console.log(error)
//             res.render(`articles/${path}`,{article: article})
//         }
//     }
// }





module.exports = router;