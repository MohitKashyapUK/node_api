const ytdl = require("ytdl-core");

function parse(stream, props) {
  const obj = {};
  props.forEach(key => obj[key] = stream[key]);
  obj["size"] = formatSize(obj["contentLength"]);
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

function formatSize(bytes) {
  const baseUnit = 1024;
  const modernUnit = 1000;
  let kb = bytes / baseUnit;
  let size, unit;

  if (kb > modernUnit) {
    let mb = kb / baseUnit;
    if (mb > modernUnit) {
      size = mb / baseUnit;
      unit = "GB";
    } else {
      size = mb;
      unit = "MB";
    }
  } else {
    size = kb;
    unit = "KB";
  }

  return `${size.toFixed(3)}${unit}`;
}

async function youtube(req, res) {
  try {
    const {id, filter} = req.query; // query parameters
  
    if (!id) { // id of yt video
      res.json({error: "ID required."});
      return;
    }/* else if (!filter) { // type of resource e.g. video or audio
      res.json({error: "Filter required."});
      return;
    } */
  
    const details = await ytdl.getInfo(id); // getting details of video
    const formats = details.formats; // formats or resolution of video
  
    switch (filter) {
      case "video":
        const video_props = ["container", "contentLength", "fps", "qualityLabel", "url", "videoCodec"];
        res.json({ formats: filter_video_streams(formats, video_props), title: details.videoDetails.title})
        break;
  
      case "audio":
        const audio_props = ["audioQuality", "audioCodec", "container", "contentLength", "url"];
        res.json({ formats: filter_audio_streams(formats, audio_props), title: details.videoDetails.title});
        break;
  
      case "progressive":
        const progressive_props = ["audioQuality", "fps", "qualityLabel", "quality", "container", "audioCodec", "videoCodec", "codecs", "contentLength", "url"];
        res.json({ formats: filter_progressive_streams(formats, progressive_props), title: details.videoDetails.title})
        break;
  
      default:
        res.json({formats, title: details.videoDetails.title});
        break;
    }
  } catch (error) {
    res.json({error: error.toString()});
  }
}

module.exports = youtube;