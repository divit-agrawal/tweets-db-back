const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

const verifyToken = require("./middlewares/verifyToken");

require("dotenv/config");

//Import Routes:
const getAllTweets = require("./routes/getAllTweets");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const addTweet = require("./routes/addTweet");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const deleteTweet = require("./routes/deleteTweet");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const updateTweet = require("./routes/updateTweet");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const searchCategory = require("./routes/searchCategory");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const searchSingleTweet = require("./routes/searchSingleTweet");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const searchTag = require("./routes/searchTag");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const register = require("./routes/register");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const login = require("./routes/login");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/getAllTweets", getAllTweets);
app.use("/addTweet", verifyToken, addTweet);
app.use("/deleteTweets", verifyToken, deleteTweet);
app.use("/updateTweet", verifyToken, updateTweet);
app.use("/searchCategory", searchCategory);
app.use("/searchTag", searchTag);
app.use("/searchSingleTweet", searchSingleTweet);
app.use("/register", register);
app.use("/login", login);

//Routes:
app.get("/", (req, res) => {
  res.json({
    document: "Tweets DB",
    message: "refer docs",
  });
});

//Connect to db:
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

//Listen on port:
app.listen(PORT);
