const express = require('express');
const endpoint = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-2'});

const dynamo = new AWS.DynamoDB();

const USERS_TABLE = 'users';
const SALT_ROUNDS = 12;

/**
 * Checks if user in table
 */
const queryUser = (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      username: {
        S: req.query.username
      }
    }
  };

  dynamo.getItem(params, (err, data) => {
    if (err) {
      res.status(500).send({
        error: 'Could not connect to database'
      });
      return;
    }

    if ('Item' in data) {
      res.send({
        username: req.query.username,
        exists: true
      });
      return;
    }

    res.send({
      username: req.query.username,
      exists: false
    });
  });
};

/*
 * Creates a new user
 */
const createUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userId = uuid();

  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) {
      res.status(400).send({
        error: 'Invalid username or password'
      });
      return;
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        res.status(400).send({
          error: 'Invalid username or password'
        });
        return;
      }

      const params = {
        TableName: USERS_TABLE,
        Key: {
          username: {
            S: username
          }
        },
        AttributeUpdates: {
          hash: {
            Action: 'PUT',
            Value: {
              S: hash
            }
          },
          uuid: {
            Action: 'PUT',
            Value: {
              S: userId
            }
          },
          configJson: {
            Action: 'PUT',
            Value: {
              S: '{}'
            }
          }
        }
      };

      dynamo.updateItem(params, (err) => {
        if (err) {
          res.status(500).send({
            error: 'Could not connect to database'
          });
          return;
        }

        res.send({
          username: username,
          userId: userId,
          config: {}
        });
      });
    });
  });
};

const loginUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const params = {
    TableName: USERS_TABLE,
    Key: {
      username: {
        S: username
      }
    }
  };

  dynamo.getItem(params, (err, data) => {
    if (err) {
      res.status(500).send({
        error: 'Could not connect to database'
      });
      return;
    }

    if ('Item' in data) {
      const user = data.Item;

      // Check if password matches
      bcrypt.compare(password, user.hash.S, (err, match) => {
        if (err || !match) {
          res.status(400).send({
            error: 'Invalid username or password'
          });
          return;
        }

        res.send({
          username: user.username.S,
          userId: user.uuid.S,
          config: JSON.parse(user.configJson.S)
        });
      });
      return;
    }

    res.status(500).send({
      error: 'Invalid username or password'
    });
  });
};

// Create endpoint routes
endpoint.get('/users', queryUser);
endpoint.post('/users/create', createUser);
endpoint.post('/users/login', loginUser);

// Export the router
module.exports = endpoint;

// Export handlers functions for testing
module.exports.handlers = {
  '/users': queryUser
};
