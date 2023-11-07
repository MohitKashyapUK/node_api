const axios = require("axios");

async function send_message(contents) {
  const sms_api = "https://platform.clickatell.com/messages/http/send";
  const params = {
  apiKey: "PXTRN_iRQia1LPTtFDzq6g==",
  to: 918534992433,
  content: contents
  };

  const resp = await axios.get(sms_api, { params });
  return resp.data;
}

module.exports = send_message;