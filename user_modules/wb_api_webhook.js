const send_text_to_whatsapp = require("./libs/send_text_to_whatsapp");
const sk_results = require("./libs/sk_results");

async function main(req, res) {
  const message_object = req.body["messages"][0];

  if (message_object == undefined || !message_object["author"].startsWith("917037127740")) {
    res.end();
    return;
  }

  const text = message_object.body.trim().toLowerCase();
  const sk_names_array = ["faridabad", "gaziabad", "gali", "disawer", "all"];
  const name = sk_names_array.find(value => value == text);
  
  if (name == undefined) {
    res.end();
    return;
  }
  
  const results = await sk_results();
  const { current: current_date, previous: previous_date } = results.date;
  let message;

  if (name != "all") {
    const sk_obj = results[name];
    const { current, previous } = sk_obj;
    let text = name + " ";
    let is_current = true;

    if (current) {
      text += current;
    } else {
      is_current = false;
      text += previous + ".";
    }

    text = (is_current ? current_date : previous_date) + "\n\n" + text;
    message = text;
  } else {
    const array = sk_names_array.slice(0, 4);
    let is_current = false;
    let all_results = "";

    for (let i = 0; i < 4; i++) {
      const sk_name = array[i];
      const { current, previous } = results[sk_name];
      let text = "\n" + sk_name + " ";

      if (current) {
        text += current;
        if (is_current != true) {
          is_current = true;
        }
      } else {
        text += previous + ".";
      }

      all_results += text;
    }

    all_results = (is_current ? current_date : previous_date) + "\n" + all_results;

    message = all_results;
  }

  await send_text_to_whatsapp(message);

  res.end();
}

module.exports = main;