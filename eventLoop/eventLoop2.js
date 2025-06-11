const fs = require("fs");

const a =100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("promise").then(console.log);

fs.readFile('./file.txt','utf-8',(err,data) =>{
    console.log("File Reading CB",data)
});

setTimeout(()=> console.log("Timer expired"),0);

process.nextTick(() => console.log("process next Tick"));

function printA(){
    console.log("a:",a);
}

printA();
console.log("last line of the file")

// console output 
// a: 100
// last line of the file
// process next Tick    
// promise
// Timer expired        
// setImmediate
// File Reading CB This a sample file for test
