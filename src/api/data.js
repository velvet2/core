import { App } from './app';
import { Database } from '../db';
import express from 'express';
import path from 'path';

/**
 * @swagger
 * api/datas:
 *   get:
 *     tags:
 *       - Data
 *     summary: "List data"
 *     description: Read datasets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of datasets
 */
App.post('/data_label', function(req, res){
    var label_id = req.body['label_id'] || undefined;
    var data_id = req.body['data_id'] || undefined;
    var data = req.body['data'] || undefined;

    if(!label_id || !data_id || !data){
        res.status(500).json({"error": "insufficient data"});
    } else {
        Database.query("SELECT * FROM data_label WHERE label_id=:label AND data_id=:data",
            {   replacements: { label: label_id, data: data_id},
                type: Database.QueryTypes.SELECT })
            .then(function(rows){
                res.status(200).json({data: rows[0]});
                if(rows.length > 0){
                    Database.query("UPDATE data_label SET data=:data WHERE label_id=:label_id AND data_id=:data_id",
                        {   replacement : { data : JSON.stringify(data),
                                            label_id: label_id,
                                            data_id: data_id },
                            type: Database.QueryTypes.UPDATE})
                        .then(function(rows){

                        }, function(err){
                            res.status(500).json({error: err.message});
                        })
                } else {
                    Database.query("INSERT INTO data_label (data, label_id, data_id) VALUES (:data, :label_id, :data_id)",
                        {   replacement : { data : JSON.stringify(data),
                                            label_id: label_id,
                                            data_id: data_id },
                            type: Database.QueryTypes.UPDATE})
                        .then(function(rows){

                        }, function(err){
                            res.status(500).json({error: err.message});
                        })
                }
            }, function(err){
                res.status(500).json({error: err.message});
            });
    }
});

/**
 * @swagger
 * api/data_label/{id}:
 *   get:
 *     tags:
 *       - Label
 *     summary: "list label"
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
App.get('/data_label/:id', function(req, res){
    var id = req.params.id;

    Database.prepare(`SELECT
                        data_label.data_id as id ,
                        data_label.data as label
                    FROM
                        data_label
                    JOIN
                        data ON data.id = data_label.data_id
                    WHERE data.dataset_id = :id`,
         {  replacements : {id : id },
            type: Database.QueryTypes.SELECT })
        .then(function(rows){
            res.status(200).json({data: rows[0]})
        }, function(err){
            res.status(500).json({error: err.message})
        });
});
