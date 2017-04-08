import { App } from './app';
import { Database } from '../db';
import db from '../models';
import _ from 'lodash';
import crypto from 'crypto';
import passport from 'passport';

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     require:
 *       - name
 *       - password
 *     properties:
 *       username:
 *         type: string
 *         example: "user"
 *       password:
 *         type: string
 *         example: "password"
 */

/**
 * @swagger
 * api/auth:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: "Authenticate user"
 *     description: Authenticate using username password
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: ApiKey to use for authentication token
 */
App.post("/auth", (req, res)=>{
    let shasum = crypto.createHash('sha1');
    shasum.update(req.body.password);

    db.User.findOne({ where : {
                    "username": req.body.username,
                    "password": shasum.digest('hex')}
                }).then(( User ) => {
        if ( User ) {
            let token = crypto.randomBytes(32).toString('hex');
            db.SecurityToken.create({
                user_id: User.dataValues.id,
                token: token
            }).then(( user ) => {
                if ( user ){
                    res.json({"token": token})
                } else {
                    res.status(500);
                }
            });
        } else {
            res.status(401);
        }
    })
});

/**
 * @swagger
 * api/users:
 *   post:
 *     tags:
 *       - User
 *     summary: "Create user"
 *     description: Create new user account
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Details of created user
 */
App.post("/users", (req, res)=>{
    let shasum = crypto.createHash('sha1');
    shasum.update(req.body.password);
    req.body.password = shasum.digest('hex');
    db.User.findOne({ where : { username: req.body.username }})
    .then( ( user ) => {
        if ( !user ) {
            db.User.create(req.body).then(( user ) => {
                if ( user ){
                    res.json(user.dataValues)
                } else {
                    res.status(500)
                }
            });
        } else {
            res.status(500).json({"error": "username already registered"});
        }
    });
});

/**
 * @swagger
 * api/users:
 *   get:
 *     tags:
 *       - User
 *     summary: "List user"
 *     description: Query a list of user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of user
 */
App.get("/users", (req, res)=>{
    db.User.findAll({ "attributes" : ['id', 'username']}).then( ( users ) => {
        let usrs = _.map(users, (v) => {
            return v.dataValues;
        });
        res.json(usrs);
    });
});

/**
 * @swagger
 * api/users/me:
 *   get:
 *     tags:
 *       - User
 *     summary: "Get current user infomation"
 *     security:
 *       - Token: []
 *     description: Get identity of current ApiKey
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of user
 */
App.get('/users/me', passport.authenticate('token', { session:false }), (request, response)=>{
    db.User.findOne({ where : { id: request.user.id}}).then( ( user ) => {
        response.json({id: user.dataValues.id, username: user.dataValues.username})
    });
});
