'use strict'

const Comment= require('../models/comment')  
const Post= require('../models/post')   
const User= require('../models/user')   
const services=require('../service')

function getComment(req, res){
    let postId= req.params.postId
    Post.findById(postId, (err,post)=>{
        if(err)return res.status(500).send({message:`Error a la peticion ${err}`})
        if(!post)return res.status(404).send({message:'El post no existe'})
        res.status(200).send({post})
    })
}  

function getComments(req,res){
    Post.find({},(err, post)=>{
        User.populate(post, {path: "author"},function(err, post){
            if(err)return res.status(500).send({message:`Error a la peticion ${err}`})
            if(!post)return res.status(404).send({message:'No existen posteos'})
        	res.status(200).send(post);
        }); 
             
    })
}


function saveComment(req,res){
    
    var postId= req.body.comments    
    var comment = new Comment()
    comment.content=req.body.content
    comment.author=req.user
    comment.post=postId
    
    comment.save((err,commentStored)=>{
        if(err) res.status(500).send({message:`Error al guardar el Comentario ${err}`})        
        Post.findById(postId, function(err, post) {
            if (err) return res.send(err);
            post.comments.push(comment);
            post.save(function(err) {
                if (err) return res.send(err);
            });
            });
        res.status(200).send({message:`Los campos se guardaron correctamente ${comment}`})
    })   

 
}    
     



function updateComment(req,res){
    let postId= req.params.postId
    let update=req.body
    Post.findByIdAndUpdate(postId,update,(err,posttUpdated)=>{
        if(err) res.status(500).send({message:`Error al actualizar el post ${err}`})
        res.status(200).send({post: posttUpdated})
            
    })
}

function deleteComment(req,res){
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
    getComment,
    getComments,
    saveComment,
    updateComment,
    deleteComment,
}