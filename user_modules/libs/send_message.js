const axios = require("axios");

async function main(contents) {
  const sms_api = "https://platform.clickatell.com/messages/http/send";
  const params = {
    apiKey: "PXTRN_iRQia1LPTtFDzq6g==",
    to: 918534992433,
    content: contents
  };
  await axios.get(sms_api, { params });
}

module.exports = main;