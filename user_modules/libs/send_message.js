const axios = require("axios");
const send_text_to_whatsapp = require("./send_text_to_whatsapp");

async function main(contents) {
  const sms_api = "https://platform.clickatell.com/messages/http/send";
  const params = {
    apiKey: "PXTRN_iRQia1LPTtFDzq6g==",
    to: 918534992433,
    content: contents
  };

  await send_text_to_whatsapp(contents);
  await axios.get(sms_api, { params });
}

module.exports = main;