const axios = require("axios");

async function proxy(req, res) {
  const client_headers = req.headers;

  delete client_headers.host;

  if (client_headers["referer"]) {
    delete client_headers["referer"];
  }
  
  const url = decodeURIComponent(req.query.url);
  
  console.log("Client headers:", client_headers);

  // Axios configurations
  const configs = { responseType: "stream", headers: client_headers };

  axios.get(url, configs)
    .then((response) => {
      // URL headers
      const url_headers = JSON.parse(JSON.stringify(response.headers));

      console.log("URL headers:", url_headers);

      // setting client headers
      res.set(url_headers);

      // Read data from the stream.
      response.data.on("data", (data) => {
        res.write(data);
      });
  
      // Close the stream.
      response.data.on("end", () => {
        res.end();
      });
    })
    .catch((error) => {
      console.log(error);

      res.end();
    });
}

module.exports = proxy;