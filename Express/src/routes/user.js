const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/users/request/received", userAuth, async (req, res) => {
  try {
    const loggedInid = req.user._id;

    const connectionReceived = await ConnectionRequest.find({
      toUserID: loggedInid,
      status: "interested",
    }).populate("fromUserID", "firstName lastName");
    // .populate("fromUserID",["firstName","lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionReceived,
    });
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});

userRouter.get("/users/connections", userAuth, async (req, res) => {
  try {
    const loggedInid = req.user._id;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserID: loggedInid, status: "accepted" },
        { fromUserID: loggedInid, status: "accepted" },
      ],
    })
      .populate("fromUserID", "firstName lastName")
      .populate("toUserID", "firstName lastName");

    const data = connections.map((row) => {
      if (row.fromUserID._id.toString() === loggedInid.toString()) {
        return row.toUserID;
      }
      return row.fromUserID;
    });
    res.json({
      message: "Data fetched successfully",
      data,
    });
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});

module.exports = {
  userRouter,
};
