const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, default: null, unique: true },
  tweets: [
    {
      tweet_id: { type: String, default: null },
      order: { type: Number, default: 0 },
    },
  ],
});

categorySchema.pre("validate", function (next) {
  this.count = this.tweets.length;
  next();
});
module.exports = mongoose.model("Categories", categorySchema);
//in add Tweet, if category exists, then add that tweet is and order into category.
//TODO:
//1. to delete is_featured route in tweet.js and all respective routes
//2. updateTweet route -> not possible thank you
//3. 
