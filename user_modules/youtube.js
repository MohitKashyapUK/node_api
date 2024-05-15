const ytdl = require("ytdl-core");

function parse(stream, props) {
  const obj = {};
  props.forEach(key => obj[key] = stream[key]);
  return obj;
}

function filter_video_streams(formats, props) {
  const array = [];
  formats.forEach(stream => {
    if (stream.hasVideo && !stream.hasAudio) array.push(parse(stream, props));
  });
  return array;
}

function filter_audio_streams(formats, props) {
  const array = [];
  formats.forEach(stream => {
    if (!stream.hasVideo && stream.hasAudio) array.push(parse(stream, props));
  });
  return array;
}

function filter_progressive_streams(formats, props) {
  const array = [];
  formats.forEach(stream => {
    if (stream.hasVideo && stream.hasAudio) array.push(parse(stream, props));
  });
  return array;
}

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
        const video_props = ["container", "contentLength", "fps", "qualityLabel", "url", "videoCodec"];
        res.json(filter_video_streams(formats, video_props));
        break;
  
      case "audio":
        const audio_props = ["audioQuality", "audioCodec", "container", "contentLength", "url"];
        res.json(filter_audio_streams(formats, audio_props));
        break;
  
      case "progressive":
        const progressive_props = ["audioQuality", "fps", "qualityLabel", "quality", "container", "audioCodec", "videoCodec", "codecs", "contentLength", "url"];
        res.json(filter_progressive_streams(formats, progressive_props));
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