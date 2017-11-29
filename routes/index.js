'use strict'

const express= require('express')
const ProductCtrl= require ('../Controller/product')
const auth=require('../middlewares/auth')
const api=express.Router()
const userCtrl = require('../Controller/user')
const PostCtrl= require ('../Controller/post')
const commeentCtrl= require ('../Controller/comment')

// Llamada a las api
api.get('/product',auth,ProductCtrl.getProducts)
api.get('/product/:productId',ProductCtrl.getProduct)
api.post('/product',ProductCtrl.saveProduct)
api.put('/product/:productId',auth,ProductCtrl.updateProduct)
api.delete('/product/:productId',ProductCtrl.deleteProduct)

//Post
api.get('/post',PostCtrl.getPosts)
api.get('/post/:postId',PostCtrl.getPost)
api.post('/post',auth,PostCtrl.savePost)
api.put('/post/:postId',auth,PostCtrl.updatePost)
api.delete('/post/:postId',PostCtrl.deletePost)

//Comment
api.post('/comment',auth,commeentCtrl.saveComment)


//Login
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/private',auth,(req,res)=>{
        res.status(200).send({mesagge:'Tienes acceso'})
})

module.exports=api





