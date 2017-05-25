import { App } from './app';
import { Project } from '../models';
import _ from 'lodash';

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
App.post('/project/data/:project_id/:data_id', function(req, res){
    Project.create(_.assign({'config': '{}'}, req.body)).then(function(v){
        res.json(v)
    });
});

/**
 * @swagger
 * api/project/{id}:
 *   get:
 *     tags:
 *       - Project
 *     description: Edit projectt
 *     summary: Edit project
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
App.get('/project/data/:project_id/:data_id', function (req, res) {
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
App.delete('/project/data/:project_id/:data_id', function (req, res) {
    Project.destroy({where: { id : req.params.id}}).then( function(rows){
        if(rows){
            res.status(200).json()
        } else {
            res.status(404).json()
        }
    });
});
