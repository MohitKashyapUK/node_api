const ytdl = require("ytdl-core");

const id = "miVF5Yn8cOE";

ytdl.getInfo(id)
.then(data => {
  // const formats = ytdl.filterFormats(data.formats, "videoonly");
  console.log(data);
})