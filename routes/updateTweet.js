const express = require("express");

const router = express.Router();

const Tweet = require("../models/tweet");

router.post("/", async (req, res) => {
  if (!req.body.data || !req.body.categories) {
    return res.status(400).send({ message: "Missing required parameters" });
  }
  const tweet_url = req.body.data;
  const extracted_tweet_id = tweet_url
    .toString()
    .substring(tweet_url.length - 19, tweet_url.length);
  await Tweet.findOneAndUpdate(
    { tweet_id: `${extracted_tweet_id}` },
    { categories: req.body.categories }
  )
    .then((data) => {
      console.log(data);
      res.json({ message: "Tweet updated!" });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
