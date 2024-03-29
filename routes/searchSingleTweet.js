const express = require("express");
const Tweet = require("../models/tweet");

const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.data) {
    return res.status(400).send({ message: "Missing required parameters" });
  }
  const tweet_url = req.body.data;
  const extracted_tweet_id = tweet_url
    .toString()
    .substring(tweet_url.length - 19, tweet_url.length);
  await Tweet.findOne({ tweet_id: extracted_tweet_id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
