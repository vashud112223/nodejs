console.log("Hello World");

const crypto = require("node:crypto");
const fs = require('fs');

const key = crypto.pbkdf2(
  "password",
  "salt",
  1000000,
  64,
  "sha512",
  (err, derivedkey) => {
    if (err) throw err;
    console.log(derivedkey.toString('hex'));
  }
);

fs.readFile('./file.txt','utf-8',(err,data) => {
    console.log("File Data",data)
})

setTimeout(() => {
    console.log("settimeout called")
},5000)