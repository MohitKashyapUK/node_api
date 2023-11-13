const axios = require("axios");

function proxy(req, res) {
  const client_headers = req.headers;

  const range = client_headers.range;

  const url = "http://ip270035912.ahcdn.com/key=ixo6U0Hps+8zPMH0oFX2Pw,end=1699897550/state=ZVJSak26/buffer=4000000:22486092,1856.7/speed=207616/reftag=55309829/ssd3/65/6/218699196/b/328000/328611/328611.mp4"; //decodeURIComponent(req.query.url);

  // const url_object = new URL(url);

  // client_headers.host = url_object.hostname;
  // client_headers.accept = "*/*";

  const configs = { responseType: "stream" };

  if (range) {
    configs["headers"] = {};
    configs["headers"]["range"] = range;
  }

  axios.get(url, configs)
    .then((response) => {
      // URL headers
      const url_headers = JSON.parse(JSON.stringify(response.headers));

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
      console.error("Error:", error);
      res.end();
    });
}

module.exports = proxy;