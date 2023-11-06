const express = require("express");

const app = express();
const port = 3000;

const user_modules_path = "./user_modules/";

const index = require(user_modules_path + "index");
const lucky_numbers = require(user_modules_path + "lucky_numbers");

// URL root
app.get("/", (req, res) => res.send("Hello, this is the home page!"));

// get 10 lucky numbers
app.get("/sk/lucky_numbers", lucky_numbers);

// get sk results by name
app.get('/sk/:name', index);

// starting express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});