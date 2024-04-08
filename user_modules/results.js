function main(req, res) {
    const cheerio = require("cheerio");
    
    const $ = cheerio.fromURL("https://sattakingrecords.com");
    
    const element = $("body > div.container-fluid > div > font > div:nth-child(1) > div.game_result > div > font:nth-child(3) > b");
    
    res.send(element.toString());
}

module.exports = main;