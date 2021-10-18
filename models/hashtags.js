const mongoose = require("mongoose");

const hashTagSchema = new mongoose.Schema({
  name: { type: String, default: null },
  count: { type: Number, default: 1 },
});

module.exports = mongoose.model("Hashtags", hashTagSchema);
