const { Router } = require("express");
const express = require("express");
const Tweet = require("../models/tweet");

const router = express.Router();

//gets all the tweets in the db
router.get("/", (req, res) => {
  Tweet.find()
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
