import { App } from './app';
import { Project, Data, ProjectData } from '../models';
import _ from 'lodash';
import { Database } from '../db';

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
 *       dataset_id:
 *         type: integer
 *       label:
 *         type: string
 *       config:
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
    Project.findAll({attributes: ['id', 'name', 'name', 'dataset_id']}).then( function(rows){
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
    Project.create(_.assign({'config': '{}'}, req.body)).then(function(v){
        res.json(v)
    });
});

/**
 * @swagger
 * api/project/{id}:
 *   put:
 *     tags:
 *       - Project
 *     description: Edit project
 *     summary: "Edit project"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Project'
 *     responses:
 *       200:
 *         description: List of rooms
 */
App.put('/project/:id', function(req, res){
    let config = req.body.config || {};

    Project.findOne({where: { id : req.params.id}}).then( function(rows){
        if(rows){
            rows.dataValues.name = req.body.name || rows.dataValues.name;
            if(typeof(config) == 'object'){
                try {
                    rows.dataValues.config = JSON.parse(rows.dataValues.config);
                } catch (e) {}
                rows.dataValues.config = _.assign(rows.dataValues.config, config);
                rows.dataValues.config = JSON.stringify(rows.dataValues.config);
            }

            Project.update(rows.dataValues, {where: {id: req.params.id}}).then(function(rows){
                res.status(200).json()
            }, function(err){
                res.status(500).json()
            })
        } else {
            res.status(404).json()
        }
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
App.get('/project/:id', function (req, res) {
    Project.findOne({where: { id : req.params.id}}).then( function(rows){
      if (rows){
        Database.query("SELECT id, name, path, label, inference FROM datas LEFT JOIN project_data on project_data.data_id = datas.id WHERE dataset_id=:dataset_id ",
            { replacements: { dataset_id: rows.dataValues.dataset_id, },
              type: Database.QueryTypes.SELECT }).then((datas)=>{
          rows.dataValues.datas = _.map(datas, (v)=>{
            v.label = JSON.parse(v.label);
            v.inference = JSON.parse(v.inference);
            return v;
          });
          rows.dataValues.config = JSON.parse(rows.dataValues.config)
          res.json(rows.dataValues)
        })
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
        if(rows){
            res.status(200).json()
        } else {
            res.status(404).json()
        }
    });
});
