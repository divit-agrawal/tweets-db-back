const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

require("dotenv/config");

//Import Routes:
const getAllTweets = require("./routes/getAllTweets");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/getAllTweets", getAllTweets);

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
