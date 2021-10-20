const express = require("express");
const Tweet = require("../models/tweet");
const Categories = require("../models/categories");

const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.category) {
    return res.status(400).send({ message: "Missing required parameters" });
  }
  await Categories.find({ name: req.body.category }).then(async (data) => {
    var arr = await Promise.all(
      data[0].tweets.map(async (ele) => {
        let a = await Tweet.find({ tweet_id: ele.tweet_id });
        return { ...a["0"]["_doc"], order: ele.order };
      })
    );
    res.json(arr);
  });
});

module.exports = router;
