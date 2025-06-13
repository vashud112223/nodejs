const validator = require("validator");

const ValidateUser = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not vald");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports= { ValidateUser };
