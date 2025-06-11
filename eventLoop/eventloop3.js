const fs = require("fs");

const a = 100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("promise").then(console.log);

fs.readFile("./file.txt", "utf-8", (err, data) => {
  setTimeout(() => console.log(" 2nd Timer expired"), 0);
  process.nextTick(() => console.log("2nd process next Tick"));
  setImmediate(() => console.log("2nd setImmediate"));
  console.log("File Reading CB again", data);
});

setTimeout(() => console.log("Timer expired"), 0);

process.nextTick(() => console.log("process next Tick"));

function printA() {
  console.log("a:", a);
}

printA();
console.log("last line of the file");

// console output
a: 100;
// last line of the file
// process next Tick
// promise
// Timer expired
// setImmediate
// File Reading CB again This a sample file for test
// 2nd process next Tick
// 2nd setImmediate
//  2nd Timer expired
