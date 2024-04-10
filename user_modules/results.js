function main(req, res) {
    const cheerio = require("cheerio");
    const axios = require("axios");

    const URL = "https://sattakingrecords.com";

    axios.get(URL)
    .then(({data}) => {
        const $ = cheerio.load(data);
        
        const result = $("body > div.container-fluid > div > font > div:nth-child(1) > div.game_result > div > font:nth-child(3) > b").contents().toString().trim();
        
        if (result.length == 2) {
            res.json({"Faridabad": result});
        } else {
            res.send("Result is not available.");
        }
    });
}

module.exports = main;