const send_text_to_whatsapp = require("./libs/send_text_to_whatsapp");

async function main(req, res) {
  /* const message_object = req.body["messages"][0];

  if (message_object == undefined || !message_object["author"].startsWith("917037127740")) {
    res.end();
    process.exit();
  }

  const text = message_object.body; */

  // await send_text_to_whatsapp(contents.toString());

  res.send(req.body);
}

module.exports = main;