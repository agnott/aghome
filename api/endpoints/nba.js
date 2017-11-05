const express = require('express');
const endpoint = express.Router();

const axios = require('axios');
const moment = require('moment');

const log = require('../utils/logger');

const NBA_LEAGUE_ID = '00';
const HEADERS = {
  'origin': 'http://stats.nba.com'
};

/**
 * Returns object with nba scores by scraping espn
 */
const getNbaScores = (req, res) => {
  const date = req.query.date || moment().format('MM DD YYYY');

  axios.get('https://stats.nba.com/stats/scoreboardv2/', {
    headers: HEADERS,
    params: {
      LeagueID: NBA_LEAGUE_ID,
      DayOffset: 0,
      GameDate: date
    }
  })
  .then((axRes) => {
    const data = {};

    // Transform data from table to list of objects
    for (const set of axRes.data.resultSets) {
      data[set.name] = set.rowSet.map((item, j) => {
        let ret = {};
        for (const [i, header] of set.headers.entries()) {
          ret[header] = item[i];
        }
        return ret;
      });
    }

    res.send(data);
  })
  .catch((axErr) => {
    res.status(500).send({
      error: 'Failed to get NBA scores'
    });
  });
};

// Create endpoint routes
endpoint.get('/nba/scores', getNbaScores);

// Export the router
module.exports = endpoint;

// Export handlers functions for testing
module.exports.handlers = {
  '/nba/scores': getNbaScores
};
