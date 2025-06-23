const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

const requestRouter = express.Router();

requestRouter.post(
  "/sendConnectionRequest/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserID = req.params.toUserId;
      const fromUserID = req.user._id;
      const status = req.params.status;

      const Allowed_Status = ["interested", "ignored"];
      if (!Allowed_Status.includes(status)) {
        throw new Error("Invalid Status type");
      }

      // if (toUserID.toString() === fromUserID.toString()) {
      //   return res.status(400).send("Cannot send request to yourself");
      // }
      const toUser = await User.findById(toUserID);
      if (!toUser) {
        return res.status(404).send("User not found");
      }

      const isexistingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserID: fromUserID, toUserID: toUserID },
          { fromUserID: toUserID, toUserID: fromUserID },
        ],
      });

      if (isexistingRequest) {
        return res.status(400).send("Connection Request Already Exists");
      }
      const ConnectionRequestSchema = new ConnectionRequest({
        toUserID,
        fromUserID,
        status,
      });

      const data = await ConnectionRequestSchema.save();

      const emaillRes = await sendEmail.run(
        " A new friend request from " +
          req.user.firstName , req.user.firstName +
          " is " +
          status +
          " in " +
          toUser.firstName
      );
      console.log(emaillRes);

      res.send("Connection request sent successfully", data);
    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInid = req.user._id;
      const { status, requestId } = req.params;

      const Allowed_Status = ["accepted", "rejected"];
      if (!Allowed_Status.includes(status)) {
        throw new Error("Status not allowed");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserID: loggedInid,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection request: " + status, data });
    } catch (err) {
      res.status(404).send("Error: " + err.message);
    }
  }
);
module.exports = {
  requestRouter,
};
