const axios = require("axios");

function proxy(req, res) {
  const client_headers = req.headers;

  const url = "http%3A%2F%2Fip270035912.ahcdn.com%2Fkey%3Dixo6U0Hps%2B8zPMH0oFX2Pw%2Cend%3D1699897550%2Fstate%3DZVJSak26%2Fbuffer%3D4000000%3A22486092%2C1856.7%2Fspeed%3D207616%2Freftag%3D55309829%2Fssd3%2F65%2F6%2F218699196%2Fb%2F328000%2F328611%2F328611.mp4"; //decodeURIComponent(req.query.url);

  const url_object = new URL(url);

  client_headers.host = url_object.hostname;
  client_headers.accept = "*/*";

  axios.get(url, {
    responseType: "stream",
    headers: client_headers
  })
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
      const message = error.message;
      console.log(message);
      res.end();
    });
}

module.exports = proxy;