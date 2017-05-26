import { App } from './app';
import { Project, Data, ProjectData } from '../models';
import _ from 'lodash';


/**
 * @swagger
 * api/project/data/:project_id:
 *   post:
 *     tags:
 *       - Project
 *     description: Create or update label for dataset
 *     summary: "Edit label"
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
App.post('/project/data/:project_id', function(req, res){
    if(req.body.data && req.body.data.length == 0){
        res.status(400).json({"error": "data ids is not defined"})
    }

    Project.findOne({where : { id: req.params.project_id }}).then((v)=>{
      if(v){
        Data.count({where: { dataset_id: v.dataValues.dataset_id, id: req.body.data}}).then((v)=>{
          console.log("data", v)
          if ( v != req.body.data.length){
            res.status(400).json({"erorr": "not all data present in database"})
          } else {
            let all_upsert = []
            _.each(req.body.data, (i)=>{
              all_upsert.push(customUpsert(req.params.project_id, i, req.body.label, req.body.inference));
            });
            Promise.all(all_upsert).then((v)=>{
              res.json({})
            })
          }
        }, (e)=>{
          res.status(500).json({"error": e})
        })

      } else{
        res.status(404).json({"error": "project not found"})
      }
    })
});

function customUpsert(project_id, data_id, label, inference){
  return new Promise((resolve, reject)=>{
    ProjectData.count({where: { project_id : project_id, data_id: data_id}}).then((v)=>{
      if(v){
        ProjectData.update({ label: JSON.stringify(label),
                      inference: JSON.stringify(inference)
                    }, { where: {
                          project_id: project_id,
                          data_id: data_id,
        }}).then((v)=>{
          resolve(v)
        }, (e)=>{
          console.log(e)
          reject(false)
        })
      } else {
        ProjectData.create({project_id: project_id,
                    data_id: data_id,
                    label: JSON.stringify(label),
                    inference: JSON.stringify(inference)},
                  {
                    fields: ['project_id', 'data_id', 'label', 'inference']
                  })
              .then((v)=>{
                resolve(v)
          }, (e)=> {
            console.log(e)
            reject(false)
          })
      }
    })
  })
} 
