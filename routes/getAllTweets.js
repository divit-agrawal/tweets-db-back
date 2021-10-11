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
