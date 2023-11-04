const axios = require("axios");

const content = `Faridabad
44.50
45.50
97.30
87.30
23.30
60.30`;

const sms_api = "https://platform.clickatell.com/messages/http/send";

const params = {
  apiKey: "PXTRN_iRQia1LPTtFDzq6g==",
  to: 918534992433,
  content,
};

axios.get(sms_api, { params })
  .then(resp => {
    console.log(resp.data);
  })
  .catch(error => {
    console.log(error.message);
  });