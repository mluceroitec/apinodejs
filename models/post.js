'use strict'
const mongoose= require('mongoose')
const Schema= mongoose.Schema

const PostShema= Schema(
    {
        content: String, 
        picture: String,
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date, default: Date.now() },       
       
        author: { type: Schema.ObjectId, ref: "user" },
        
        comments: [{type: Schema.Types.Object,ref: 'comment'}]
        
    }
)

module.exports= mongoose.model('Post',PostShema)