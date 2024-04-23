// Note: Async function mein await lagaana jaruri hai kyonki Cyclic backend ko terminate kar deta hai agar request full fill ho jaye to.

// Libraries
const express = require("express");

// Initializing the app
const app = express();
const port = 3000;

// Middlewares
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Custom libraries
const user_modules_path = "./user_modules/"; // Base or path to the libraries

const sk = require(user_modules_path + "sk");
const lucky_numbers = require(user_modules_path + "lucky_numbers");
const proxy = require(user_modules_path + "proxy");
const youtube = require(user_modules_path + "youtube");
const results = require(user_modules_path + "results");
const testing = require(user_modules_path + "testing");

const wb_api_webhook = require(user_modules_path + "wb_api_webhook");

// URL root
app.get("/", (req, res) => res.send("Homepage!"));

app.get("/testing", testing);

// get 10 lucky numbers
app.get("/sk/lucky-numbers", lucky_numbers);

// get sk results by name
app.get('/sk/:name', sk);

// '/proxy/<path>' including '/'
app.get(/^\/proxy\/(.+)/, proxy);

// /^\/youtube\/(.+)/
app.get("/youtube/video", youtube);

app.get(/^\/results?/, results);


app.post("/wb_api_webhook", wb_api_webhook);

// starting express (app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});