function main(req, res) {
    const cheerio = require("cheerio");
    const axios = require("axios");

    axios.get()
    .then(({data}) => {
        const $ = cheerio.loadBuffer(data);
        
        const element = $("body > div.container-fluid > div > font > div:nth-child(1) > div.game_result > div > font:nth-child(3) > b");
        
        res.send(element.toString());
    });
}

module.exports = main;