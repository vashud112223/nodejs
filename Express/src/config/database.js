const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ashutoshverma557:gXoTablrYSvNIs8Q@cluster1.bdu7y.mongodb.net/devTinder"
  );
};

module.exports = {connectDB,}

  