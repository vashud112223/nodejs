const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "us-east-1";
// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: "AKIA5LRAGZNVBFT6A2PJ",
    secretAccessKey: "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",
  },
});
module.exports = { sesClient };
