const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  profile_image_url: { type: String },
  name: { type: String, required: true },
  user_name: { type: String, required: true },
  text: { type: String, required: true },
  tweet_id: { type: String, required: true },
  image_url: {
    type: String,
    required: false,
  },
  created_at: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  categories: [
    {
      name: { type: String, default: null },
      order: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Tweet", tweetSchema);
