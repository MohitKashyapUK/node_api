/* const { spawn } = require('node:child_process');

const ls = spawn('ffmpeg', ["-i", "C:\\Users\\mohit\\Class 9th science\\Characteristics of Particles of Matter - Explanation  Class 9 Science Chapter 1 (LIVE).mp4"]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data.toString()}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data.toString()}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
}); */

const prompt = require("readline-sync");

const name = prompt.question("What is your name? ");

console.log(name);