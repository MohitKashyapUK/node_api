// const axios = require("axios");
const ytdl = require("ytdl-core");

function youtube(req, res) {
  // const methods = ["video", "playlist"];
  // const get = req.query.get;
  let url = req.query.url;

  // if (!(get == undefined)) {
    
  // }
  
  if (url == "") {
    res.json({ "error": "YouTube video URL is required." });
    return;
  }

  url = decodeURIComponent(url);

  try {
    ytdl.getInfo(url)
      .then(data => {
        const formats = data.formats;
        const videowithaudio = formats.filter(value => value.hasAudio && value.hasVideo);
        res.json(videowithaudio);
      }).catch(error => {
        res.json({ "error": new String(error) });
      })
  } catch (error) {
    res.json({ "error": new String(error) });
  }
}

module.exports = youtube;