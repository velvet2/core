import { App } from './app';
import { Database } from '../db';
import { Room } from '../models';

/**
 * @swagger
 * definitions:
 *   Room:
 *     tags:
 *       - Room
 *     type: object
 *     require:
 *       - name
 *     properties:
 *       name:
 *         type: string
 */

/**
 * @swagger
 * api/rooms:
 *   get:
 *     tags:
 *       - Room
 *     summary: "List rooms"
 *     description: Read rooms
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of rooms
 */
App.get("/rooms", (req, res)=>{
    res.json({"helo": "world"})
});

/**
 * @swagger
 * api/rooms:
 *   post:
 *     tags:
 *       - Room
 *     description: Read rooms
 *     summary: "Create rooms"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Room'
 *     responses:
 *       200:
 *         description: List of rooms
 */
App.post("/rooms", (req, res)=>{
    res.json(req.body)
});

App.get("/rooms/:id", (req, res)=>{
    res.json({"id": 1})
});

// export default ({ config, db }) =>  {
//     return {
//         create: (query, model, cb) => {
//             cb(null, ["create"]);
//             //first argument is response status, second is array of response data
//         },
//
//         delete:   (id, query, cb) => {},
//         read:     (query, cb) => {
//             cb(null, [{"asd": 1}]);
//         },
//         readById: (id, query, cb) => {},
//         update:   (id, query, model, cb) => {}
//     }
// };
