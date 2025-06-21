const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.send(user);
  } catch (err) {
    res.status(400).send("Error on login: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Update not allowed");
    }

    const loggedinUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));

    await loggedinUser.save();

    res.json({
      message: `${loggedinUser.firstName}, your profile is update succesfully`,
      data: loggedinUser,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
module.exports = { profileRouter };
