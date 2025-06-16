const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user");

const USER_SAFE_DATA = "fromUserID firstName lastName age gender skills";

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

//user should see all the user cards except
// his own card
// his connections
// ignored people
// already sent the connection request

userRouter.get("/users/feed", userAuth, async (req, res) => {
  try {
    const loggedInid = req.user._id;
    //pagination
    const page = parseInt(req.query?.page) || 1;
    let limit = parseInt(req.query?.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    // find connectionRequests
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserID: loggedInid }, { toUserID: loggedInid }],
    }).select("fromUserID toUserID");
    // write logic to hide the connection user

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserID);
      hideUsersFromFeed.add(req.toUserID);
    });

    // finally find the feed

    const users = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideUsersFromFeed) },
        },
        { _id: { $ne: loggedInid } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = {
  userRouter,
};
