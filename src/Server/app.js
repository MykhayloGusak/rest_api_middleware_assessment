const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const config = require('config');
require('dotenv').config();
let port = process.env.PORT || 3000;

const api = require('../Routes');

const App = () => {
  const app = express();

  // support application/json type post data
  app.use(bodyParser.json());

  //support application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse content into JSON
  app.use(express.json());

  // serving static files
  app.use(express.static('public'));

  // HTTP request logger middleware
  app.use(morgan('dev'));

  // user user router
  app.use('/api/v1', api);

  // error handler
  // app.use(errorHandler);

  // set port
  app.set('port', port || 3030);

  // swagger documentation
  // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // app.use('/api/v1', api);

  // app.use(middlewares.notFound);
  // app.use(middlewares.errorHandler);

  return { app };
};

module.exports = App().app;
