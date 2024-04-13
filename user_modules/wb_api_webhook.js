const send_text_to_whatsapp = require("./libs/send_text_to_whatsapp");

async function main(req, res) {
  const contents = req.body;
  await send_text_to_whatsapp(contents.toString());
  res.end();
}

module.exports = main;