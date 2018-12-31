'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Primary', { useNewUrlParser: true })
        .then( () => {
            console.log('Conexión a la BD MongoDB exitosa!');
            //Creación del servidor
            app.listen(port,() =>{
                console.log('Servidor cargado exitosamente en localhost:'+port);
            });
            
        })
        .catch(error => console.log(err));