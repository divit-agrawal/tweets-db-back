const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  profile_url: { type: String },
  title: { type: String, required: true },
  text: { type: String, required: true },
  tweet_url: { type: String, required: true },
  tags: {
    type: Array,
    default: [],
  },
  image_url: {
    type: String,
  },
  created_at: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tweet", tweetSchema);
