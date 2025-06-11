const express = require("express");

const app = express();

app.use('/hello',(req,res)=> {
    res.end("Hello from the server")
})
app.listen(3000,()=> {
    console.log("Server is successfully on port 3000")
});