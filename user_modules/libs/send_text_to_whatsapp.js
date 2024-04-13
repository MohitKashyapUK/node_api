const axios = require("axios");

async function main(text) {
    const URL = "https://sandbox.1msg.io/HEI129502266/sendMessage";
    const body = {
        "token": "link_LTLcfy5Qe7GHxWg7xRbsrnUpN2C4wEcE",
        "phone": "917037127740",
        "body": text
    };

    await axios.post(URL, body, { headers: { 'Content-Type': 'application/json' } });
}

module.exports = main;