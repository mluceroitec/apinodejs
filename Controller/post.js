'use strict'

const Post= require('../models/post')   
const User= require('../models/user')   
const services=require('../service')

function getPost(req, res){
    let postId= req.params.postId
    Post.findById(postId, (err,post)=>{
        if(err)return res.status(500).send({message:`Error a la peticion ${err}`})
        if(!post)return res.status(404).send({message:'El post no existe'})
        res.status(200).send({post})
    })
}  

function getPosts(req,res){
    Post.find({},(err, post)=>{
        User.populate(post, {path: "author"},function(err, post){
            if(err)return res.status(500).send({message:`Error a la peticion ${err}`})
            if(!post)return res.status(404).send({message:'No existen posteos'})
        	res.status(200).send(post);
        }); 
             
    })
}



function savePost(req,res){
   let post = new Post()
   post.content=req.body.content
   post.picture= req.body.picture
   post.author=req.user
   post.save((err,postStored)=>{
       if(err) res.status(500).send({message:`Error al guardar el post ${err}`})
       res.status(200).send({message:`Los campos se guardaron correctamente ${post}`})
   })
    
}    
     



function updatePost(req,res){
    let postId= req.params.postId
    let update=req.body
    Post.findByIdAndUpdate(postId,update,(err,posttUpdated)=>{
        if(err) res.status(500).send({message:`Error al actualizar el post ${err}`})
        res.status(200).send({post: posttUpdated})
            
    })
}

function deletePost(req,res){
    let postId= req.params.postId
    Post.findById(postId,(err,post)=>{
        if(err) res.status(500).send({message:`Error al borrar el post ${err}`})
            
        post.remove(err=>{
            if(err) res.status(500).send({message:`Error al borrar el post ${err}`})
            res.status(200).send({message:'El post se elimino correctamente'})
            
        })
    })
}


module.exports={
    getPosts,
    getPost,
    savePost,
    updatePost,
    deletePost,
}