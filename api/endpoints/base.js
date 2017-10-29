const ENV = process.env;

const express = require('express');
const endpoint = express.Router();

/**
 * Returns the API version
 */
const getApiVersion = (req, res) => {
  res.send({
    version: ENV.API_VERSION
  });
};

// Create endpoint routes
endpoint.get('/', getApiVersion);

// Export the router
module.exports = endpoint;

// Export handlers functions for testing
module.exports.handlers = {
  '/': getApiVersion
};
