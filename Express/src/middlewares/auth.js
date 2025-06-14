//Handle Auth Middleware for All request
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedMessage = await jwt.verify(token, "Ashutosh@9192");
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
