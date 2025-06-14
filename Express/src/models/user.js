const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Id: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        // Custom Validation
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not allowed");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default value", // we can set the default value in any field
    },
    skills: {
      type: [String],
      maxLenght: 10,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Ashutosh@9192", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
 const user =this
 const passwordHash = user.password;
 const ispasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

 return ispasswordValid;
}
module.exports = mongoose.model("User", userSchema);
