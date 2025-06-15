const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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
      res.send("Connection request sent successfully", data);
    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  }
);

module.exports = {
  requestRouter,
};
