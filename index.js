'use strict'

const mongoose= require('mongoose')
const app=require('./app')
const config= require('./config')




mongoose.connect(config.db,(err,res)=>{
    // if(err) {
    //     return console.log(`Error de conexion`)
    // }
    console.log('Conexion a la base de datos con exito')
    app.listen(config.port,()=> {
        console.log('Api rest en el puerto 3000');
    })
})

