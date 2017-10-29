require('dotenv').config();

const assert = require('assert');
const { handlers } = require('./../base');
const { res } = require('./../../utils/test/mocks');

const ENV = process.env;

describe('/', () => {
  beforeEach(() => {
    res.reset();
  });

  it('should return the api version', () => {
    const req = {};

    handlers['/'](req, res);

    assert.equal(res.data.version, ENV.API_VERSION);
  });
});
