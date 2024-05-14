const ytdl = require("ytdl-core");

async function youtube(req, res) {
  const {id, resourceType} = req.query; // query parameters

  if (!id) { // id of yt video
    res.json({error: "ID required."});
    return;
  }

  if (!resourceType) { // type of resource e.g. video or audio
    res.json({error: "Resource type required."});
    return;
  }

  const details = await ytdl.getInfo(id); // getting details of video
  const formats = details.formats; // formats or resolution of video

  switch (resourceType) {
    case "video":
      const video_formats = formats.filter(({hasAudio, hasVideo}) => hasVideo && !hasAudio);
      res.json({video_formats});
      break;

    case "audio":
      const audio_formats = formats.filter(({hasAudio, hasVideo}) => hasAudio && !hasVideo);
      res.json({audio_formats});
      break;

    case "progressive_video":
      const progressive_video_formats = formats.filter(({hasAudio, hasVideo}) => hasVideo && hasAudio);
      res.json({progressive_video_formats});
      break;
  }
}

module.exports = youtube;