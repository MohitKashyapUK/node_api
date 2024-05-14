const ytdl = require("ytdl-core");

const id = "miVF5Yn8cOE";

ytdl.getInfo(id)
.then(data => {
  console.log(data.formats);
})