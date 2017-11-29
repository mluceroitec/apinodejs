'use strict'
const mongoose= require('mongoose')
const Schema= mongoose.Schema

const CommentSchema= Schema({

    author: {type: Schema.Types.ObjectId,ref: 'User'},
    post: {type:Schema.Types.ObjectId, ref:'Post'},
    content: String,
    created:{type:Date, default:Date.now}

        
    })
  
  module.exports= mongoose.model('Comment',CommentSchema)

