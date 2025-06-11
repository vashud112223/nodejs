const express = require("express");

const app = express();

// app.use('/',(req,res)=> {
//     res.end("namaste")
// })

// after the / whatever path we will give it still give the same output because it starts with /
// order matters here
// app.use('/hello',(req,res)=> {
//     res.end("Hello from the server")
// })
// if we use (use) it will matches all the http methods

app.get('/user',(req,res)=>{
    console.log(req.query)
    res.send({"firstname":"Ashu","lastname":"verma"})
})

app.get('/user/:userId/:name/:password',(req,res)=>{
    console.log(req.params)
    res.send({"firstname":"Ashu","lastname":"verma"})
})
// we can also give path as (ab?c),(ab+c),a(bc)+d,/a/

app.post('/user',(req,res)=>{
    res.send("User added succesfully")
})
app.listen(3000,()=> {
    console.log("Server is successfully on port 3000")
});