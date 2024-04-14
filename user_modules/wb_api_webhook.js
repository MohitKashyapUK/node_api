const send_text_to_whatsapp = require("./libs/send_text_to_whatsapp");
const sk_results = require("./libs/sk_results");

async function main(req, res) {
  const message_object = req.body["messages"][0];

  if (message_object == undefined || !message_object["author"].startsWith("917037127740")) {
    res.end();
    process.exit();
  }

  const text = message_object.body.trim().toLowerCase();
  // const sk_names_array = ["faridabad", "gaziabad", "gali", "disawer", "all"];
  // const name = sk_names_array.find(value => value == text);
  // const results = await sk_results();

  await send_text_to_whatsapp(text);

  res.send(req.body);
}

module.exports = main;