const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    toUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// connectionRequestSchema.index({fromUserID:2388383848747484, toUserID:73747738292992})
connectionRequestSchema.index({fromUserID:1, toUserID:1}); // composite indexing
connectionRequestSchema.pre("save",function(next){
  const connectionRequest = this;
  if(connectionRequest.fromUserID.equals(connectionRequest.toUserID)){
    throw new Error("Cannot send request to yourself");
  }
  next();
})
const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequest;
