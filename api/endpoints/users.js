const express = require('express');
const endpoint = express.Router();

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-2'});

const dynamo = new AWS.DynamoDB();
const USERS_TABLE = 'users';

/**
 * Checks if user in table
 */
const queryUser = (req, res) => {
  const params = {
    Key: {
      username: {
        S: req.query.username
      }
    },
    TableName: USERS_TABLE
  };

  dynamo.getItem(params, (err, data) => {
    if (err) {
      res.status(500).send({
        error: 'Could not connect to database'
      });
    } else {
      if ('Item' in data) {
        res.send({
          username: req.query.username,
          exists: true
        });
      } else {
        res.send({
          username: req.query.username,
          exists: false
        });
      }
    }
  });
};

// Create endpoint routes
endpoint.get('/users', queryUser);

// Export the router
module.exports = endpoint;

// Export handlers functions for testing
module.exports.handlers = {
  '/users': queryUser
};
