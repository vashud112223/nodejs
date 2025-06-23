//Handle Auth Middleware for All request
const jwt = require("jsonwebtoken");
const User = require("../models/user");
  console.log({"process":process.env.AWS})

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please login !");
    }
   console.log(process.env.JWT_SECRET)
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error on login: " + err.message);
  }
};
module.exports = {
  userAuth,
};
