// Libraries
const express = require("express");
const cors = require("cors");
// Built-in libraries
const path = require("node:path");

// Initializing the app
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // cors(cross origin): allowed
app.use(express.json()); // to parse application/json
app.use(express.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Custom libraries
const user_modules_path = "./user_modules/"; // Base path to the libraries

// URL root
app.get("/", (req, res) => res.send("Homepage!"));

app.get("/testing", require(user_modules_path + "testing"));

// get 10 lucky numbers
app.get("/sk/lucky-numbers", require(user_modules_path + "lucky_numbers"));

// get sk results by name
app.get('/sk/:name', require(user_modules_path + "sk"));

// '/proxy/<path>' including '/'
app.get(/^\/proxy\/(.+)/, require(user_modules_path + "proxy"));

// /^\/youtube\/(.+)/
app.get("/youtube", require(user_modules_path + "youtube"));

// Get SK results
app.get(/^\/results?/, require(user_modules_path + "results"));

// starting express (app)
app.listen(port, () => console.log(`Example app listening on port ${port}`));