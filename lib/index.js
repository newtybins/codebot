"use strict";

// dotenv
require('dotenv').config();

var twit = require('twit');

var hashtags = ['#nodejs', '#100daysofcode', '#javascript30', '#301daysofcode', '#coding']; // Create the bot instance

var Twitter = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  // Set consumer key
  consumer_secret: process.env.CONSUMER_SECRET,
  // Set consumer secret
  access_token: process.env.ACCESS_TOKEN,
  // Set access token
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var retweet = function retweet() {
  var params = {
    q: hashtags[Math.floor(Math.random() * hashtags.length)],
    result_type: 'recent',
    lang: 'en'
  };
  Twitter.get('search/tweets', params, function (err, data) {
    if (err) console.log('Something went wrong whilst searching...');else {
      var retweetId = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function (err, response) {
        if (response) console.log('Retweeted!');
        if (err) console.log('Something went wrong whilst retweeting...');
      });
    }
  });
};

retweet();
setInterval(retweet, 600000);