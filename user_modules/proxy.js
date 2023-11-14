const axios = require("axios");

function proxy(req, res) {
  const client_headers = req.headers;

  // const { range, cookie, accept } = client_headers;

  const url = "http://ip255965994.ahcdn.com/key=Kh4RIE1OQsJLQ8lmSd-pZw,end=1699971063/state=ZVNxMQ5w/buffer=4000000:22486092,1856.7/speed=207616/reftag=55309829/ssd7/65/6/218699196/b/328000/328611/328611.mp4"; // decodeURIComponent(req.query.url);

  const url_object = new URL(url);

  client_headers.host = url_object.hostname;
  // const hostname = url_object.hostname;
  // client_headers.accept = "*/*";

  const configs = { responseType: "stream", headers: client_headers };

  // const headers = configs.headers;

  // if (range) {
  //   headers.range = range;
  // }

  // if (cookie) {
  //   headers["cookie"] = cookie;
  // }

  // if (accept) {
  //   headers["accept"] = accept;
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
      console.error("Error:", error);
      res.end();
    });
}

module.exports = proxy;