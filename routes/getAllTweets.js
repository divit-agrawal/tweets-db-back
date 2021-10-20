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
      res.status(400).json({ message: err });
    });
});

module.exports = router;
