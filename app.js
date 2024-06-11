// Libraries
const express = require("express");
const cors = require("cors");
// Built-in libraries
const path = require("node:path");

// Initializing the app
const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // to parse application/json
app.use(express.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Custom libraries
const user_modules_path = "./user_modules/"; // Base path to the libraries

const sk = require(user_modules_path + "sk");
const proxy = require(user_modules_path + "proxy");
// const youtube = require(user_modules_path + "youtube");
const results = require(user_modules_path + "results");
const testing = require(user_modules_path + "testing");
const lucky_numbers = require(user_modules_path + "lucky_numbers");

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
app.get("/youtube", require(user_modules_path + "youtube"));

// Get SK results
app.get(/^\/results?/, results);

// starting express (app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});