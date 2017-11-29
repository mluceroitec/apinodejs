'use strict'

const Product= require('../models/products')   
const User= require('../models/user')   
const services=require('../service')

function getProduct(req, res){
    let productId= req.params.productId
    Product.findById(productId, (err,product)=>{
        if(err)return res.status(500).send({message:`Error a la peticion ${err}`})
        if(!product)return res.status(404).send({message:'El producto no existe'})
        res.status(200).send({product})
    })
}  

function getProducts(req,res){
    Product.find({},(err, product)=>{
        if(err)return res.status(500).send({message:`Error a la peticion ${err}`})
        if(!product)return res.status(404).send({message:'No existen los productos'})
                
        res.status(200).send({product})
        
    })
}

function saveProduct(req,res){
    const token=req.headers.authorization.split(' ')[1]
    services.decodeToken(token)

    .then(Response=>{
        req.user=Response
        
        User.findById(req.user,(err,user)=>{
            if(err) res.status(500).send({message:`Error al buscar el usuario ${err}`})
            let product = new Product()
            product.name=req.body.name
            product.picture= req.body.picture
            product.price= req.body.price
            product.category=req.body.category
            product.description=req.body.description
            product.user=user

            product.save((err,productStored)=>{
                if(err) res.status(500).send({message:`Error al guardar el producto ${err}`})
                res.status(200).send({message:`Los campos se guardaron correctamente ${product}`})
            })
            
        })
    })
    .catch(Response=>{
        req.status(response.status)
    })

   
}

function updateProduct(req,res){
    let productId= req.params.productId
    let update=req.body
    Product.findByIdAndUpdate(productId,update,(err,productUpdated)=>{
        if(err) res.status(500).send({message:`Error al actualizar el producto ${err}`})
        res.status(200).send({product: productUpdated})
            
    })
}

function deleteProduct(req,res){
    let productId= req.params.productId
    Product.findById(productId,(err,product)=>{
        if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
            
        product.remove(err=>{
            if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
            res.status(200).send({message:'El producto se elimino correctamente'})
            
        })
    })
}


module.exports={
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct,
}