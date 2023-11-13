const axios = require("axios");

function proxy(req, res) {
  const client_headers = req.headers;

  const url = decodeURIComponent(req.params.url);

  axios.get(url, {
    responseType: "stream",
    headers: client_headers
  })
    .then((response) => {
      // url headers
      const url_headers = response.headers;

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
      console.log(error.message);
    });
}

module.exports = proxy;