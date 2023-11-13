const axios = require("axios");

function proxy(req, res) {
  const client_headers = req.headers;

  const url = decodeURIComponent(req.query.url);

  const url_object = new URL(url);

  client_headers.host = url_object.hostname;
  client_headers.accept = "*/*";

  axios.get(url, {
    responseType: "stream",
    // headers: client_headers
  })
    .then((response) => {
      // URL headers
      const url_headers = JSON.parse(JSON.stringify(response.headers));

      console.log(url_headers);

      // client headers
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
      const message = error.message;
      console.log(message);
      res.end();
    });
}

module.exports = proxy;