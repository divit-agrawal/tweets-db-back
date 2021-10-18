const axios = require("axios");

const express = require("express");

const router = express.Router();

const Tweet = require("../models/tweet");

const HashTag = require("../models/hashtags");

//post one tweet in db
router.post("/", async (req, res) => {
  const tweet_url = req.body.data;
  const extracted_tweet_id = tweet_url
    .toString()
    .substring(tweet_url.length - 19, tweet_url.length);
  const existingTweet = await Tweet.findOne({ tweet_id: extracted_tweet_id });
  if (existingTweet) return res.json({ message: "Tweet already exists!" });
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
  //checking if image url is there or not
  var img_url;
  if (!Data.includes.media) {
    img_url = null;
  } else img_url = Data.includes.media[0].url;
  //converting all catergories to lowercase for better finding
  req.body.categories.map((cat) => {
    cat = cat.toString().toLowerCase();
    console.log(cat);
  });
  let hash = Data.data.text.toString().match(/#[a-z]+/gi);
  const tweet = new Tweet({
    profile_image_url: Data.includes.users[0].profile_image_url,
    name: Data.includes.users[0].name,
    user_name: Data.includes.users[0].username,
    text: Data.data.text,
    tweet_id: Data.data.id,
    image_url: img_url,
    created_at: Data.data.created_at,
    tags: hash,
    categories: req.body.categories,
    is_featured: req.body.is_featured,
  });
  for (let i = 0; i < hash.length; i++) {
    await HashTag.findOneAndUpdate(
      { name: hash[i] },
      { $inc: { count: 1 } }
    ).then(async (data) => {
      console.log(data);
      if (data == null) {
        await HashTag.create({
          name: hash[i],
        });
      }
    });
  }
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
