const express = require("express");

const router = express.Router();

const Category = require("../models/categories");

//post one tweet in db
router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: "Missing required parameters" });
  }
  const category = new Category({
    name: req.body.name.toString().toLowerCase(),
  });
  await category
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
