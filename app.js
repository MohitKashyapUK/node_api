const express = require("express");

const app = express();
const port = 3000;

const user_modules_path = "./user_modules/";

const index = require(user_modules_path + "index.js");

// URL root
app.get('/:name', index);

// starting express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});