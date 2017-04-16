import { App } from './app';
import { Project } from '../models';
import _ from 'lodash';

/**
 * @swagger
 * definitions:
 *   Project:
 *     tags:
 *       - Dataset
 *     type: object
 *     require:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *       dataset:
 *         type: integer
 *       label:
 *         type: string
 */

/**
 * @swagger
 * api/project:
 *   get:
 *     tags:
 *       - Project
 *     summary: "List Project"
 *     description: Read Project
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of project
 */
App.get('/project', function(req, res){
    Project.findAll({attributes: ['id', 'name', 'name', 'dataset']}).then( function(rows){
        res.json(_.map(rows, function(value){
            return value.dataValues;
        }))
    });
});

/**
 * @swagger
 * api/project:
 *   post:
 *     tags:
 *       - Project
 *     description: Create project
 *     summary: "Create project"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Project'
 *     responses:
 *       200:
 *         description: List of rooms
 */
App.post('/project', function(req, res){
    Project.create(req.body).then(function(v){
        res.json(v)
    });
});

/**
 * @swagger
 * api/project/{id}:
 *   get:
 *     tags:
 *       - Project
 *     description: Read projectt
 *     summary: Read project
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: project detail
 */
App.get('/project/:id', function (req, res) {
    Project.findOne({where: { id : req.params.id}}).then( function(rows){
        if(rows){
            res.json(rows.dataValues)
        } else {
            res.status(404).json()
        }
    });
});

/**
 * @swagger
 * api/project/{id}:
 *   delete:
 *     tags:
 *       - Project
 *     description: delete project
 *     summary: "delete project"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: project deleted
 */
App.delete('/project/:id', function (req, res) {
    Project.destroy({where: { id : req.params.id}}).then( function(rows){
        if(row){
            res.status(200).json()
        } else {
            res.status(404).json()
        }
    });
});
