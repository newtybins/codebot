// dotenv
require('dotenv').config();

const twit = require('twit');

const hashtags = [
  '#nodejs',
  '#100daysofcode',
  '#javascript30',
  '#301daysofcode',
  '#coding'
];

// Create the bot instance
const Twitter = new twit({
  consumer_key: process.env.CONSUMER_KEY, // Set consumer key
  consumer_secret: process.env.CONSUMER_SECRET, // Set consumer secret
  access_token: process.env.ACCESS_TOKEN, // Set access token
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const retweet = () => {
  const params = {
    q: hashtags[Math.floor(Math.random() * hashtags.length)],
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, (err, data) => {
    if (err)
      console.log('Something went wrong whilst searching...');

    else {
      const retweetId = data.statuses[0].id_str;

      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, (err, response) => {
        if (response)
          console.log('Retweeted!');

        if (err)
          console.log('Something went wrong whilst retweeting...');
      });
    }
  });
};

retweet();
setInterval(retweet, 600000);
