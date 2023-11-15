const axios = require("axios").default;

function proxy(req, res) {
  const request_headers = req.headers;
  
  delete request_headers.host;
  
  const url = req.params[0];
  
  if (request_headers.referer !== undefined) {
    request_headers.referer = url;
  }
  
  const params = req.query;

  // Axios configurations
  const configs = {
    method: "get",
    url,
    responseType: "stream",
    headers: request_headers,
    params
  };

  axios(configs)
    .then((response) => {
      const status = Number(response.status);

      // URL headers
      const response_headers = JSON.parse(JSON.stringify(response.headers));

      res.status(status);

      // setting client headers
      res.set(response_headers);

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
      res.end("Something wrong: " + error.message);
    });
}

module.exports = proxy;