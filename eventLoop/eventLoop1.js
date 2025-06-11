const fs = require("fs");

const a =100;

setImmediate(() => console.log("setImmediate"));
fs.readFile('./file.txt','utf-8',(err,data) =>{
    console.log("File Reading CB",data)
});

setTimeout(()=> console.log("Timer expired"),0);

function printA(){
    console.log("a:",a);
}

printA();
console.log("last line of the file")

//console output

// a: 100
// last line of the file
// Timer expired
// setImmediate
// File Reading CB This a sample file for test