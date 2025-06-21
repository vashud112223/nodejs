const express = require("express");
const { ValidateUser } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
  // Validate the user
  try {
    ValidateUser(req);

    // Encrypt the password

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);
    console.log({ firstName });
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // Creating a new Instance of the user model
    //   const user = new User({
    //     firstName: "Aman",
    //     lastName: "Verma",
    //     emailId: "aman@gmail.com",
    //     password: "aman@1234",
    //     age: 24,
    //     gender:"M"
    //   })

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 14 * 360000),
      });
    res.json({message: "Data added succesfully", data: savedUser});
  } catch (err) {
    res.status(400).send("Error saving the data ;" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email is not present in DB");
    }

    const ispasswordvalid = await user.validatePassword(password);
    if (ispasswordvalid) {
      //Create a jwt token

      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 14 * 360000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error on login: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully");
});

authRouter.patch("/forget", userAuth, async (req, res) => {
  try {
    const { emailId,updatedPassword } = req.body;
    console.log(updatedPassword);
    const user = await User.findOne({ emailId: emailId });
    const loggedInUser = req.user;
    console.log(loggedInUser);
    if (!validator.isStrongPassword(updatedPassword)) {
      throw new Error("Enter Strong Password: " + updatedPassword);
    }

    const passwordHash = await bcrypt.hash(updatedPassword, 10);
    loggedInUser.password = passwordHash;
    console.log(loggedInUser);
    loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your password is update succesfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error on login: " + err.message);
  }
});
module.exports = { authRouter };
