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

app.get("/", (req, res) => res.send("Homepage!")); // Main page
app.get("/testing", require(user_modules_path + "testing")); // Development
app.get("/sk/lucky-numbers", require(user_modules_path + "lucky_numbers")); // get 10 lucky numbers
app.get('/sk/:name', require(user_modules_path + "sk")); // get sk results by name
app.get(/^\/proxy\/(.+)/, require(user_modules_path + "proxy")); // '/proxy/<path>' including '/'
app.get("/youtube", require(user_modules_path + "youtube")); // /^\/youtube\/(.+)/
app.get(/^\/results?/, require(user_modules_path + "results")); // Get SK results

app.listen(port, () => console.log(`Example app listening on port ${port}`)); // starting express (app)