'use strict'

var express = require('express');
var ProjectController = require('../controladores/project');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

//Routes for GET operations
router.get('/home',ProjectController.home);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);

//Routes for POST operations
router.post('/test',ProjectController.test);
router.post('/project',ProjectController.saveProject);
router.post('/upload-file/:id', multipartMiddleware, ProjectController.uploadFile);

//Routes for PUT operations
router.put('/project/:id', ProjectController.updateProject);

//Routes for DELETE operations
router.delete('/project/:id', ProjectController.deleteProject);


module.exports = router;