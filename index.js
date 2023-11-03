const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const port = 3000;

// URL root
app.get('/:name', (req, res) => {
  const URL = "http://satta-king.in"; // sk url for scraping sk results
  const name = req.params.name; // sk name. e.g. faridabad
  const sk_names_array = ["faridabad", "gaziabad", "gali", "disawer"];

  // sk results as object
  async function get_results(html) {
    const $ = await cheerio.load(html);
    const table = $("body > table:first");
    const tbody_array = table.children("tbody");
    const current_results_td_doms = tbody_array.eq(-1).find("tr > td");
    const current_sk_date = current_results_td_doms.eq(0).contents().toString().trim();

    const is_previous = true;
  
    // previous results
    if (is_previous) { // agar aaj last din hai month ka to previous ko add mat karna
      var previous_results_td_doms = tbody_array.eq(-2).find("tr > td");
      var previous_sk_date = previous_results_td_doms.eq(0).contents().toString().trim();
    }
  
    const results = { date: { current: current_sk_date, previous: previous_sk_date }};
  
    for (let i = 2; i < 6; i++) {
      const name = sk_names_array[i - 2]; // sk name. e.g. faridabad
      const current_result = current_results_td_doms.eq(i).contents().toString().trim(); // aajka result
  
      if (is_previous) {
        var previous_result = previous_results_td_doms.eq(i).contents().toString().trim(); // kalka result
      }
  
      let sk_result = { "current": current_result };
  
      sk_result["previous"] = is_previous ? previous_result : null;
  
      results[name] = sk_result;
    }
  
    return results;
  }

  // send sms
  async function send_message(contents) {
    const sms_api = "https://platform.clickatell.com/messages/http/send";
    const params = {
      apiKey: "PXTRN_iRQia1LPTtFDzq6g==",
      to: 918534992433,
      content: encodeURIComponent(contents)
    };
  
    const resp = await axios.get(sms_api, { params });
    return resp.data;
  }

  axios.get(URL)
  .then(async resp => {
    const results = await get_results(resp.data); // sk results object

    let index = sk_names_array.indexOf(name);

    if (index != -1) {
      var starting = index;
      var rounds = starting + 1;
    } else {
      var rounds = 4;
      var starting = 0;
    }

    const sk_dates = results["date"];
    let date = sk_dates["current"] + "\n";
    let sk_results = "";

    let has_current = false;

    for (let i = starting; i < rounds; i++) {
      const sk_name = sk_names_array[i];
      const { current, previous } = results[sk_name];
      
      if (current) {
        has_current = true;
      }

      sk_results += `\n${sk_name} ${current || (previous ? previous + "." : "not available")}`;
    }
    
    if (!has_current) {
      date = `${sk_dates["previous"]}\n`;
    }
    
    const final = date + sk_results;

    await send_message(final);
    res.send(final);
  })
  .catch(error => {
    console.log(error.message);
  });
});

// starting express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});