// const axios = require("axios");
const ytdl = require("ytdl-core");

function youtube(req, res) {
  // const url = req.params[0];

  // ytdl.getInfo(url)
  //   .then(data => {
  //     const formats = data.formats;
  //     const videowithaudio = formats.filter(value => value.hasAudio && value.hasVideo);
  //     res.json(videowithaudio);
  //   }).catch(error => {
  //     res.json({ "error": new String(error) });
  //   })
  res.json(req.query);
}

module.exports = youtube;