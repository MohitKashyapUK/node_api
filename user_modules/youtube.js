// const axios = require("axios");
const ytdl = require("ytdl-core");

async function getVideoFormats(id) {
  const yt = await ytdl.getInfo(id);
  const formats = yt.formats;
  const videowithaudio = formats.filter(value => value.hasAudio && value.hasVideo);
  return videowithaudio;
}

function youtube(req, res) {
  // const methods = ["video", "playlist"];
  // const get = req.query.get;
  const id = req.query.id;

  if (!id) {
    res.json({error: "ID required."});
    return;
  }

  getVideoFormats(id)
   .then(result => {
      res.json(result);
    })
   .catch(error => {
      res.json({ error });
    });
}

module.exports = youtube;