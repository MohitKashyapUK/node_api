const axios = require("axios");

async function proxy(req, res) {
  const client_headers = req.headers;
  
  const url = decodeURIComponent(req.query.url);
  
  // const url_object = new URL(url);
  
  // client_headers.host = url_object.hostname;
  // const hostname = url_object.hostname;
  // client_headers.accept = "*/*";
  
  console.log(client_headers);

  // Axios configurations
  const configs = { responseType: "stream", headers: {} };
  
  // Headers for HTTP request
  const headers = configs.headers;
  
  // Destructuring client headers
  const { range /* , cookie, accept, "cache-control": cache_control */ } = client_headers;

  if (range) {
    headers.range = range;
  }

  // if (cookie) {
  //   headers["cookie"] = cookie;
  // }

  // if (accept) {
  //   headers["accept"] = accept;
  // }

  // if (cache_control) {
  //   headers["cache-control"] = cache_control;
  // }

  // if (client_headers["sec-ch-ua"]) {
  //   headers["sec-ch-ua"] = client_headers["sec-ch-ua"];
  // }

  axios.get(url, configs)
    .then((response) => {
      // URL headers
      const url_headers = response.headers; // JSON.parse(JSON.stringify(response.headers));

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
      console.log(error.message);

      res.end();
    });
}

module.exports = proxy;