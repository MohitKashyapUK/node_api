const { PornHub } = require('pornhub.js');
const pornhub = new PornHub();

async function main(req, res) {
  const url = "https://www.pornhub.com/view_video.php?viewkey=652f2087b71a2"; //'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d';
  const video = await pornhub.video(url);
  res.json(video);
}

module.exports = main;