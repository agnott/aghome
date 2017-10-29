require('dotenv').config();

const ENV = process.env;

const express = require('express');
const app = express();
const bp = require('body-parser');

// Body parser options
app.use(bp.json());
app.use(bp.urlencoded({
  extended: true
}));

// Route adder
const addRoute = (path, router) => {
  app.use(`/api${path}`, router);
};

addRoute('/', require('./endpoints/base'));

app.listen(ENV.API_PORT, () => {
  console.log(`[API Server]: Listening on port ${ENV.API_PORT}`);
});
