const { exec } = require("node:child_process");
const prompt = require("readline-sync");
const axios = require("axios");

const url = prompt.question("YouTube video URL: ");
const api = "https://node-api.cyclic.app/youtube";

function getVideoId(link) {
  try {
    const url = new URL(link);
    const { pathname } = url;
    let id;

    if (pathname.startsWith("/watch")) id = url.searchParams.get("v"); // https://www.youtube.com/watch?v=<video_id>
    if (pathname.startsWith("/live")) id = pathname.slice(6); // https://www.youtube.com/live/<video_id>
    if (pathname.startsWith("/shorts")) id = pathname.slice(8); // https://www.youtube.com/shorts/<video_id>
    else id = pathname.slice(1); // https://youtu.be/<video_id>

    return id;
  } catch {
    return false;
  }
}

const id = getVideoId(url);

if (!id) {
  console.log("Invalid URL!");
  process.exit();
}

const params = {
  id,
  filter: "progressive"
};

axios.get(api, { params })
.then(data => {
  exec('your command here', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});