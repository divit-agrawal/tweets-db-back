const { Router } = require("express");
const express = require("express");
const Tweet = require("../models/tweet");

const router = express.Router();

//gets all the tweets in the db
router.get("/", (req, res) => {
  Tweet.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//post one tweet in db
router.post("/", async (req, res) => {
  const tweet = new Tweet({
    profile_url: req.body.profile_url,
    title: req.body.title,
    text: req.body.text,
    tweet_url: req.body.tweet_url,
    tags: req.body.tags,
    image_url: req.body.image_url,
    created_at: req.body.created_at,
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

//specific company
// router.get("/:postId", async (req, res) => {
//   await Post.findById(req.params.postId)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json({ message: err });
//     });
// });

module.exports = router;
