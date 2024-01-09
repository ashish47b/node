const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add the user name"],
    },
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    }, 
    phoneno: {
      type: String,
      required: [true, "Please add the user Phone No"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
