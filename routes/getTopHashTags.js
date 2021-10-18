const express = require("express");
const HashTag = require("../models/hashtags");

const router = express.Router();

//gets all the tweets in the db
router.get("/", (req, res) => {
  HashTag.find()
    .then((data) => {
      function compare(a, b) {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        return 0;
      }
      data.sort(compare);
      data = data.slice(0, 10);
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
