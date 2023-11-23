const express = require("express");

const app = express();
const port = 3000;

const user_modules_path = "./user_modules/";

const sk = require(user_modules_path + "sk");
const lucky_numbers = require(user_modules_path + "lucky_numbers");
const proxy = require(user_modules_path + "proxy");
const youtube = require(user_modules_path + "youtube");

// URL root
app.get("/", (req, res) => {
  res.send("Hello, this is the home page!")
});

// get 10 lucky numbers
app.get("/sk/lucky-numbers", lucky_numbers);

// get sk results by name
app.get('/sk/:name', sk);

app.get(/^\/proxy\/(.+)$/, proxy);

app.get(/^\/youtube\/(.+)$/, youtube);

// starting express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});