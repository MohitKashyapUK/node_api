const axios = require("axios");
const cheerio = require("cheerio");
const send_message = require("./libs/send_message");

function index(req, res) {
  const now = new Date();
  const month = now.getMonth();
  const current_month = (month + 1).toString().padStart(2, "0"); // 01 ~ 12
  const current_year = now.getFullYear(); // 2023
  const current_day = now.getDate(); // 1 ~ 31
  const lastDayOfMonth = new Date(current_year, month + 1, 0).getDate(); // 28 ~ 31, mahine ki aakhri tarikh
  
  const URL = `https://satta-king-fast.com/chart.php?month=${current_month}&year=${current_year}`; // sk url for scraping sk results
  const name = req.params.name; // sk name. e.g. faridabad
  const sk_names_array = ["disawer", "faridabad", "gaziabad", "gali"];

  const is_first_date = current_day == 1;

  if (current_day == lastDayOfMonth && name != "disawer") {
    res.send("No result(s) available!");
    return;
  } else if (is_first_date && name == "disawer") {
    res.send("Disawer result not available!");
    return;
  }

  // sk results as object
  function get_results(html) { // yah function html se sk results scrape karke object return karega jisme date bhi hogi
    /*
      return = {
        faridabad: { current: 65, previous: 58 }
      }
      // isme date bhi hogi isi tarah lekin results ek ki bajaye 4 hongi
    */
    const $ = cheerio.load(html);
    const tbody = $("body > div#section > div#container > div#mix-chart > table:first > tbody:first");
    const current_results_td_doms = tbody.find("tr.day-number:last > td");
    const current_sk_date = current_results_td_doms.eq(0).contents().toString().trim(); // e.g. 1 ~ 31

    const is_previous = 1 != current_day; // aaj pahli tarikh hai ya nahi

    // previous results
    if (is_previous) { // agar aaj last din hai month ka to previous ko add mat karna
      var previous_results_td_doms = tbody.find("tr:nth-last-child(4) > td");

      var previous_sk_date = previous_results_td_doms.eq(0).contents().toString().trim() + `-${current_month}-${current_year}`;
    }

    const results = { date: { current: current_sk_date + `-${current_month}-${current_year}`, previous: previous_sk_date }};

    // starts from 1 to ignore date td
    for (let i = 1; i < 5; i++) {
      const name = sk_names_array[i - 1]; // sk name. e.g. faridabad
      let current_result = current_results_td_doms.eq(i).contents().toString().trim(); // aajka result

      if (current_result.startsWith("X")) {
        current_result = null;
      }

      if (is_previous) {
        var previous_result = previous_results_td_doms.eq(i).contents().toString().trim(); // kalka result
      }

      let sk_result = { "current": current_result };

      sk_result["previous"] = is_previous ? previous_result : null;

      results[name] = sk_result;
    }

    return results;
  }

  axios.get(URL) // getting sk html
  .then(async resp => {
    const results = get_results(resp.data); // sk results object

    let index = sk_names_array.indexOf(name); // names array me se sk name ka index find kiya jaa raha hai, agar find hua to 0 se 3 ke beech me value hogi barna -1

    const NOT_FOUND = -1;

    if (index != NOT_FOUND) { // loop ek baar hi chalega
      var starting = index;
      var rounds = starting + 1;
    } else { // chaar baar loop chalega
      var rounds = 4;
      var starting = 0;
    }

    const sk_dates = results["date"]; // yah ek object hai jisme current aur previous dates hai
    let date = sk_dates["current"] + "\r\n"; // agar ek bhi result current ka hai to iski date bhi current ki hogi
    let sk_results = ""; // yaha par sk results aur unke naam aayenge

    let has_current = false; // yah hame batayega ki result aaj ka hai ya kal ka

    // loop logic
    /*
      starting variable ko 0 se lekar 3 tak ki value di gayi hai.
      rounds variable ki value ek jyada hogi starting variable se agar result name se maanga gaya hai, barna 4 value hogi taaki loop chaar baar chal sake
    */

    for (let i = starting; i < rounds; i++) { // result(s) ko string me
      const sk_name = sk_names_array[i];
      const { current, previous } = results[sk_name];

      // Agar 'current' available hai to 'has_current' ko true kardo, taaki 'sk_date' current ho.
      if (current) {
        has_current = true;
      }

      sk_results += `\r\n${sk_name} ${current || (previous ? previous + "." : "not available")}`;
    }

    if (!has_current) { // agar current result nahi hai to previous date set ki jaayegi
      date = `${sk_dates["previous"]}\r\n`;
    }

    const final = date + sk_results; // sk result(s)

    // await send_message(final); // number par SMS send kiya jaa raha hai
    res.send(final); // client response
  })
  .catch(error => {
    console.log(error.message);
  });
}

module.exports = index;