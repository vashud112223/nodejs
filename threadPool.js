
const crypto = require("node:crypto");
const fs = require("fs");

process.env.UV_THREADPOOL_SIZE = 5;

 crypto.pbkdf2("password","salt",1000000,64,"sha512",(err, derivedkey) => {
    if (err) throw err;
    console.log("1- cryptokey done");
  }
);
 crypto.pbkdf2("password","salt",1000000,64,"sha512",(err, derivedkey) => {
    if (err) throw err;
    console.log("2- cryptokey done");
  }
);
 crypto.pbkdf2("password","salt",1000000,64,"sha512",(err, derivedkey) => {
    if (err) throw err;
    console.log("3- cryptokey done");
  }
);
 crypto.pbkdf2("password","salt",1000000,64,"sha512",(err, derivedkey) => {
    if (err) throw err;
    console.log("4- cryptokey done");
  }
);
 crypto.pbkdf2("password","salt",1000000,64,"sha512",(err, derivedkey) => {
    if (err) throw err;
    console.log("5- cryptokey done");
  }
);

