const ENV = process.env;

const express = require('express');
const endpoint = express.Router();

/**
 * Returns the API version
 */
endpoint.get('/', (req, res) => {
  res.send({
    version: ENV.API_VERSION
  });
});

module.exports = endpoint;
