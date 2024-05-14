const ytdl = require("ytdl-core");

async function youtube(req, res) {
  try {
    const {id, resourceType} = req.query; // query parameters
  
    if (!id) { // id of yt video
      res.json({error: "ID required."});
      return;
    } else if (!resourceType) { // type of resource e.g. video or audio
      res.json({error: "Resource type required."});
      return;
    }
  
    const details = await ytdl.getInfo(id); // getting details of video
    const formats = details.formats; // formats or resolution of video
  
    switch (resourceType) {
      case "video":
        const video_formats = [];
        formats.forEach(({hasAudio, hasVideo, container, contentLength, fps, qualityLabel, url, videoCodec}) => {
          if (hasVideo && !hasAudio) video_formats.push({container, contentLength, fps, qualityLabel, url, videoCodec});
        });
        res.json(video_formats);
        break;
  
      case "audio":
        const audio_formats = [];
        formats.forEach(({hasAudio, hasVideo, audioQuality, audioCodec, container, contentLength, url}) => {
          if (!hasVideo && hasAudio) audio_formats.push({audioQuality, audioCodec, container, contentLength, url});
        });
        res.json(audio_formats);
        break;
  
      case "progressive":
        const progressive_formats = [];
        formats.forEach(({hasAudio, hasVideo, audioQuality, fps, qualityLabel, quality, container, audioCodec, videoCodec, codecs, contentLength, url}) => {
          if (hasVideo && hasAudio) progressive_formats.push({audioQuality, audioCodec, codecs, container, contentLength, fps, qualityLabel, quality, url, videoCodec});
        });
        res.json(progressive_formats);
        break;
  
      default:
        res.json(formats);
        break;
    }
  } catch (error) {
    res.json({error: error.toString()});
  }
}

module.exports = youtube;