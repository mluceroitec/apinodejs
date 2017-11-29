'use strict'
const mongoose= require('mongoose')
const Schema= mongoose.Schema


const ProductShema= Schema(
    {
        name:String,
        picture: String,
        price: {type:Number,default:0},
        category: {type:String, enum:['computers','phone','accesories']},
        description:String,
        user: {
            type: Schema.Types.Object,
            ref: 'User'
        }
    }
)

module.exports= mongoose.model('Product',ProductShema)