const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  profile_image_url: { type: String },
  name: { type: String, required: true },
  user_name: { type: String, required: true },
  text: { type: String, required: true },
  tweet_id: { type: String, required: true },
  image_url: {
    type: String,
  },
  created_at: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  categories: {
    type: Array,
    default: [],
    required: true,
  },
  is_featured: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Tweet", tweetSchema);
