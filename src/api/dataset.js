import { App } from './app';
import { Database } from '../db';
import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import mkdirp from 'mkdirp';
import multer from 'multer'
var upload = multer({ dest: 'uploads/' });
var dataPath = path.join(__dirname, '/../../src/public/data/')

/**
 * @swagger
 * definitions:
 *   Dataset:
 *     tags:
 *       - Dataset
 *     type: object
 *     require:
 *       - name
 *     properties:
 *       name:
 *         type: string
 */

/**
 * @swagger
 * api/dataset:
 *   get:
 *     tags:
 *       - Dataset
 *     summary: "List datasets"
 *     description: Read datasets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of datasets
 */
App.get('/dataset', function(req, res){
    Database.query("SELECT id, name FROM dataset")
    .then(function(rows){
        res.status(200).json({'data': rows[0]})
    }, function(err){
        res.status(500).json({'error': err.message})
    });
});

/**
 * @swagger
 * api/dataset:
 *   post:
 *     tags:
 *       - Dataset
 *     description: Read dataset
 *     summary: "Create dataset"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Dataset'
 *     responses:
 *       200:
 *         description: List of rooms
 */
App.post('/dataset', function(req, res){
    var path = crypto.randomBytes(20).toString('hex');
    var name = req.body['name'] || undefined;
    if(name == undefined){
        res.status(500).json({"error": "name must be defined"});
    } else {
        Database.query("INSERT INTO dataset (name, path) VALUES (:name, :path)",
            {   replacements: { name: name, path: path},
                type: Database.QueryTypes.INSERT })
            .then(function(insertedId){
                res.json({"data": {"id": insertedId}});
            }, function(err){
                res.status(500).json({"error": err.message});
            });
    }
});


/**
 * @swagger
 * api/dataset/upload:
 *   post:
 *     tags:
 *       - Dataset
 *     description: Upload data
 *     summary: "Create dataset"
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: file
 *         in: formData
 *         required: true
 *         type: file
 *       - name: path
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of rooms
 */
App.post('/dataset/upload', upload.single('file'), function (req, res) {
    if(!req.body.id || !req.file || !req.body.path){
        res.status(500).json({"error": "insufficient data to upload file"});
    } else {
        Database.query("SELECT * FROM dataset WHERE id=:id",
            { replacements: { id: req.body.id},
              type: Database.QueryTypes.SELECT })
            .then(function(row){
                if(row.length == 0){
                    res.status(500).json({error: `no dataset found for id=${id}`});
                } else {
                    var path = row[0]['path'];
                    fs.readFile(req.file.path, function (err, data) {
                        var filePath = decodeURIComponent(req.body.path);
                        var newPath = dataPath + path + '/' + filePath;
                        var newFullPath = newPath + '/' + req.file.originalname;
                        filePath = '/data/' + path + '/' + filePath + '/'+ req.file.originalname;

                        if (!fs.existsSync(newPath)){
                            mkdirp.sync(newPath);
                        }

                        fs.writeFile(newFullPath, data, function (err) {
                            Database.query("INSERT into DATA (dataset_id, name, path) VALUES (:id, :name, :path)",
                                {   replacements: { id: req.body.id,
                                                    name: req.file.originalname,
                                                    path: filePath},
                                    type: Database.QueryTypes.INSERT })
                                .then(function(insertId){
                                    fs.unlink(req.file.path, function(){});
                                    res.status(200).json({"status": "done"});
                                }, function(error){
                                    res.status(500).json({error: error.message});
                                });
                        });
                    });
                }
            }, function(err){
                res.status(500).json({error: err.message})
            });
    }
});

/**
 * @swagger
 * api/dataset/{id}:
 *   get:
 *     tags:
 *       - Dataset
 *     description: Read dataset
 *     summary: "Create dataset"
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
 *         description: List of rooms
 */
App.get('/dataset/:id', function (req, res) {
    Database.query("SELECT id, name, path FROM data WHERE dataset_id=:id",
                {   replacements: { id: req.params.id},
                    type: Database.QueryTypes.SELECT })
        .then(function(row){
            res.status(200).json({"data": row})
        }, function(err){
            res.status(500).json({"error": err});
        });
});

/**
 * @swagger
 * api/dataset/{id}:
 *   delete:
 *     tags:
 *       - Dataset
 *     description: delete dataset
 *     summary: "delete dataset"
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
 *         description: List of rooms
 */
App.delete('/dataset/:id', function (req, res) {
    Database.query("DELETE FROM dataset WHERE id=:id",
                {   replacements: { id: req.params.id},
                    type: Database.QueryTypes.DELETE })
        .then(function(){
            res.status(200).json({})
        }, function(err){
            res.status(500).json({"error": err});
        });
});
