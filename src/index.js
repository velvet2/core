import http from 'http';
import express from 'express';
import morgan from 'morgan';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';

let app = express();
app.server = http.createServer(app);

// set static path
app.use(express.static(path.join(__dirname, '/public')));

// passport
app.use(passport.initialize())
// app.use(passport.session())

// logger
app.use(morgan('dev'));

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:8080',
  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
      Token: {
          type: "apiKey",
          name: "Authorization",
          in: "header"
      }
  }
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./src/api/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// internal middleware
// app.use(middleware({ config, db }));
app.use(bodyParser.json())

// api router
app.use('/api', api());
app.server.listen(process.env.PORT || config.port);
console.log(`Started on port ${app.server.address().port}`);
