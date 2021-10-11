const axios = require("axios");

const express = require("express");

const router = express.Router();

const Tweet = require("../models/tweet");

//post one tweet in db
router.post("/", async (req, res) => {
  const tweet_url = req.body.data;
  const extracted_tweet_id = tweet_url
    .toString()
    .substring(tweet_url.length - 19, tweet_url.length);
  var new_url = `https://api.twitter.com/2/tweets/${extracted_tweet_id}?user.fields=profile_image_url&tweet.fields=created_at,attachments&expansions=attachments.media_keys,author_id&media.fields=preview_image_url,url`;
  new_url = new_url.toString();
  var config = {
    method: "get",
    url: `${new_url}`,
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  };
  var Data;
  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      Data = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  // console.log(Data.data)
  // console.log(Data.data.text.toString().match(/#[a-z]+/gi));
  const tweet = new Tweet({
    profile_image_url: Data.includes.users[0].profile_image_url,
    name: Data.includes.users[0].name,
    user_name: Data.includes.users[0].username,
    text: Data.data.text,
    tweet_id: Data.data.id,
    image_url: Data.includes.media[0].url,
    created_at: Data.data.created_at,
    tags: Data.data.text.toString().match(/#[a-z]+/gi),
    categories: req.body.categories ,
    is_featured: req.body.is_featured,
  });
  await tweet
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
