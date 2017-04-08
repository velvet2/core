import { App } from './app';
import { Database } from '../db';
import express from 'express';
import path from 'path';

/**
 * @swagger
 * definitions:
 *   Label:
 *     tags:
 *       - Label
 *     type: object
 *     require:
 *       - name
 *       - dataset
 *     properties:
 *       name:
 *         type: string
 *       dataset:
 *         type: integer
 */

/**
 * @swagger
 * api/labels/{id}:
 *   get:
 *     tags:
 *       - Label
 *     summary: "List data"
 *     description: Read datasets
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: List of datasets
 */
App.get('/labels/:id', function(req, res){
    Database.query('SELECT * from label where dataset_id=:id',
        {   replacements: { id: req.params.id},
            type: Database.QueryTypes.SELECT })
        .then(function(rows){
            res.status(200).json({'data': rows[0]})
        }, function(err){
            res.status(500).json({error: err.message});
        })
});

/**
 * @swagger
 * api/labels:
 *   post:
 *     tags:
 *       - Label
 *     summary: "create label"
 *     description: Read datasets
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Label'
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of datasets
 */
App.post('/labels', function(req, res){
    var name = req.body.name;
    var dataset_id = req.body.dataset;

    if(name == undefined || dataset_id == undefined){
        res.status(500).json({"error": "name/dataset must be defined"});
    } else {
        Database.query("INSERT INTO label (dataset_id, name) VALUES (:dataset_id, :name)",
            {   replacements: { dataset_id: dataset_id, name: name},
                type: Database.QueryTypes.INSERT })
            .then(function(insertedId){
                res.json({"data": {"id": insertedId}});
            }, function(err){
                res.status(500).json({"error": err.message});
            });
    }
});
