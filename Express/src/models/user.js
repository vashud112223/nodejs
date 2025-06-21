const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { ValidateUser } = require("../utils/validation");

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
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender typr`
      }
      // validate(value) {
      //   // Custom Validation
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender is not allowed");
      //   }
      // },
    },
    about: {
      type: String,
      default: "This is a default value", // we can set the default value in any field
    },
    skills: {
      type: [String],
      maxLenght: 10,
    },
    photoURL: {
      type: [String],
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr5U9WBoL0qLQwT4YyjNgEzZLJxUrlSFSciQ&s"
    }
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
console.log("ispasswordValid",ispasswordValid)
 return ispasswordValid;
}
module.exports = mongoose.model("User", userSchema);
