require('dotenv').config();

const twit = require('twit');

// get hashtags
const hashtags = require('./hashtags');

// Create the bot instance
const Twitter = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const run = () => {
  const params = {
    q: hashtags[Math.floor(Math.random() * hashtags.length)], // set the query as a random hashtag specified
    result_type: 'recent', // make sure the tweet is recent
    lang: 'en' // make sure the tweet is english
  }

  Twitter.get('search/tweets', params, (err, data) => { // search for tweets
    if (err) return console.log(`The following error occurred whilst searching. ${err}`); // catch errors

    const id = data.statuses[0].id_str; // get the id

    // POST retweet request
    Twitter.post('statuses/retweet/:id', { id }, err => {
      if (err === 'Error: You have already retweeted this Tweet.') return run(); // if it has already been retweeted, try again
      else if (err) return console.log(`The following error occured whilst retweeting. ${err}`); // catch errors


      console.log('Retweeted!');
    });
    
    // POST like request
    Twitter.post('favorites/create', { id }, err => {
      if (err === 'Error: You have already favorited this status.') return run(); // if it has already been liked, try again
      else if (err) return console.log(`The following error occured whilst liking. ${err}`); // catch errors

      console.log('Liked');
    })
  });
};

run();
setInterval(run, 600000);