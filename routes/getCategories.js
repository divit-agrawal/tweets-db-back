const express = require("express");

const Categories = require("../models/categories");

const router = express.Router();

router.get("/", (req, res) => {
  Categories.aggregate([
    { $addFields: { count: { $size: "$tweets" } } },
    { $unset: "tweets" },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
