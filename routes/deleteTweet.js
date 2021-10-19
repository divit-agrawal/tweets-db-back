const express = require("express");

const router = express.Router();

const Tweet = require("../models/tweet");

const HashTag = require("../models/hashtags");

var EventEmitter = require("events").EventEmitter;
var Data = new EventEmitter();

router.post("/", async (req, res) => {
  const tweet_url = req.body.data;

  const extracted_tweet_id = tweet_url
    .toString()
    .substring(tweet_url.length - 19, tweet_url.length);
  Tweet.findOneAndDelete({ tweet_id: `${extracted_tweet_id}` })
    .then((data) => {
      Data.data = data;
      Data.emit("update");
      res.status(200).send({ message: "Tweet Deleted" });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });

  Data.on("update", async () => {
    let hash = Data.data.text.toString().match(/#[a-z]+/gi);
    console.log(hash);
    for (let i = 0; i < hash.length; i++) {
      await HashTag.findOneAndUpdate(
        { name: hash[i] },
        { $inc: { count: -1 } }
      ).then(async (data) => {
        // console.log(data);
        if (data == null) {
          console.log("data null");
        }
      });
    }
  });
});

module.exports = router;
