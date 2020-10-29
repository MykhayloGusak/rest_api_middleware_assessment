const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('config');

const { errorHandler, notFound } = require('../Middlewares');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const port = config.port || 3000;
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

  // swagger documentation
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // user user router
  app.use('/api/v1', api);

  // set port
  app.set('port', port || 3030);

  app.use(notFound);
  app.use(errorHandler);

  return { app };
};

module.exports = App().app;
