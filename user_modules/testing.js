const sk_results = require("./libs/sk_results");

async function main(req, res) {
  const results = await sk_results();
  res.send(results);
}

module.exports = main;