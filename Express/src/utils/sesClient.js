const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "us-east-1";
<<<<<<< HEAD

// Create SES service object.
  console.log({"process":process.env.AWS_ACCESS_KEY})
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

=======
// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: "AKIA5LRAGZNVBFT6A2PJ",
    secretAccessKey: "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",
  },
});
>>>>>>> c7bb3f4 (implement the logic for sending email using aws ses)
module.exports = { sesClient };
