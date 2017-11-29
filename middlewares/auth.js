'use strict'

const services=require('../service')
function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'No tienes autorizacion'})
    }
    const token=req.headers.authorization.split(' ')[1]
    services.decodeToken(token)
    .then(Response=>{
        req.user=Response
        next()
    })
    .catch(Response=>{
        req.status(response.status)
    })

    
}

module.exports= isAuth