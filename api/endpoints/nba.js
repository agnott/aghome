const express = require('express');
const endpoint = express.Router();

const request = require('request');
const cheerio = require('cheerio');

/**
 * Returns object with nba scores by scraping espn
 */
const getNbaScores = (req, res) => {
  const date = req.query.date;

  request(`https://www.cbssports.com/nba/scoreboard/${date}`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Construct game objects
      const scores = $('.single-score-card.nba').map((i, el) => {
        const info = {};
        const home = {};
        const away = {};
        const stats = {};

        if ($(el).hasClass('ingame')) {
          info.status = 'ingame';
        } else if ($(el).hasClass('postgame')) {
          info.status = 'postgame';
        } else {
          info.status = 'pregame';
        }

        // Get game time, date, and broadcasting
        info.broadcast = $(el).find('.top-bar .broadcaster').text().trim();
        switch (info.status) {
        case 'pregame':
          info.gametime = JSON.parse(
            $(el).find('.top-bar .pregame-date').attr('data-format-datetime')
          ).value;
          break;
        case 'ingame':
          info.quarter = $(el).find('.top-bar .game-status').text().trim().split(' ');
          break;
        case 'postgame':
          info.outcome = $(el).find('.top-bar .game-status').text().trim();
          break;
        }

        const scoreboard = $(el).find('.in-progress-table.section');
        const scoreRows = {
          away: scoreboard.find('table tbody tr').first(),
          home: scoreboard.find('table tbody tr').last()
        };

        // Get the names of each team
        away.name = scoreRows.away.find('td.team a.team').text();
        home.name = scoreRows.home.find('td.team a.team').text();

        // Get the record of each team
        const recordRegex = /\b[0-9]*-[0-9]*(-[0-9]*)*$/;
        away.record = recordRegex.exec(scoreRows.away.find('td.team').text().trim())[0];
        home.record = recordRegex.exec(scoreRows.home.find('td.team').text().trim())[0];

        // Get the logo images for each team
        away.image = scoreRows.away.find('td.team img').attr('src');
        home.image = scoreRows.home.find('td.team img').attr('src');

        // Get quarter (and overtime) scoring for each team
        away.quarters = scoreRows.away.find('td:not(.team)').map((i, el) => {
          return $(el).text().trim();
        }).get();
        home.quarters = scoreRows.home.find('td:not(.team)').map((i, el) => {
          return $(el).text().trim();
        }).get();

        return {
          info,
          home,
          away,
          stats
        };
      }).toArray();

      res.send(scores);
    } else {
      res.status(500).send({
        error: 'Could not process NBA scores'
      });
    }
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
