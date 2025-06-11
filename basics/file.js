const fs = require('fs');

//Sync
// const res = fs.writeFileSync('./test.js',"Hii there");

//Async
// fs.writeFile('./test.js',"Hello hii there",(err)=>{})

// console.log(fs.readFileSync('./contact.txt',"utf-8"))   

// fs.readFile('./contact.txt',"utf-8",(err,result) => {
//     console.log(result)
// })
fs.appendFileSync('./test.txt',"\nHlo")
// fs.unlinkSync('./contact.txt')