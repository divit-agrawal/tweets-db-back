const express = require("express");
const Tweet = require("../models/tweet");

const router = express.Router();

router.post("/", async (req, res) => {
  await Tweet.find({ tags: { $all: req.body.tag.toString() } })
    .then((data) => {
      const page = 1;
      const limit = req.query.limit;
      const startIndex = 0;
      const endIndex = page * limit;
      const result = data.slice(startIndex, endIndex);
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
