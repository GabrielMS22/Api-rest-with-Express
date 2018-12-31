'use strict';

var Project = require('../modelos/project');
var fs = require('fs');
var controller = {

    home: function (req,res) {
        return res.status(200).send({
            message: 'Home'
        });
    },
    test: function (req,res) {
        return res.status(200).send({
            message: 'Metodo test'
        });
    },

    saveProject: function (req,res) {
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = params.image;
        
        project.save( (error,response) =>{

            if(error) {
                return res.status(500).send({
                response: "Error al guardar el documento"
            });
        }
            if(!response) {
                return res.status(404).send({
                response: "No se ha podido guardar el documento"
            });
        }
            return res.status(200).send({
                response: response
              
            });
        })
  
        
    },

    getProject:  function(req,res){
        var projectId = req.params.id;

        if(!projectId) return res.status(404).send({response: "El proyecto no existe"});

        Project.findById(projectId, (error, project) =>{

            if(error) return res.status(500).send( { response: "Error al devolver los datos"});

            if(!project) return res.status(404).send( { response:"El proyecto no existe"});

            return res.status(200).send({ response: project});
        });

    },
    getProjects: function(req,res){

        Project.find({}).sort("year").exec((error,projects) => {

            if(error) return res.status(500).send({ response: "Error al devolver datos"});

            if(!projects) return res.status(400).send({ response: "No hay proyectos"});

            return res.status(200).send({projects});
        });
    },

    updateProject: function(req,res){

        const projectId = req.params.id;
        const update = req.body;
        Project.findByIdAndUpdate(projectId, update, {new:true}, (err,project) => {

            if(err) return res.status(500).send({response: "Error al devolver los datos"});

            if(!project) return res.status(404).send({response: "No existe el documento"});

            return res.status(200).send({ project });

        });
    },

    deleteProject: function(req,res){

        const projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (error,deletedProject) => {

            if(error) return res.status(500).send({ response: "Error al eliminar" });

            if(!deletedProject) return res.status(404).send({ response:"El archivo no existe" });
            return res.status(200).send({ response: deletedProject});
        });
    },

    uploadFile: function(req,res){
        
        const projectId = req.params.id;
        var filePath = req.files.image.path.split('\\');

        var ext = filePath[1].split('.');
        var path = req.files.image.path;
       if(ext[1] == 'jpg' ||  ext[1] == 'gif' || ext[1] == 'png'){

                Project.findByIdAndUpdate(projectId, { image: filePath[1] }, { new: true }, (error, updatedProject) => {

                    if (error) return res.status(500).send({ response: "Error al devolver el proyecto" });
                    if (!updatedProject) return res.status(404).send({ response: "No existe el proyecto" });

                    
                    return res.status(200).send({ response: updatedProject });
                });
                
            }else{
                
                fs.unlink(path, () => {
                    return res.status(200).send({ response: "Archivo no guardado" })
                });
            }
                   
        
        }
        
       
        
    

};

module.exports = controller;