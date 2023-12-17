const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 8,
    select: false,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password "],
    minLength: 8,
  },
  role: { type: String },
  photo: { type: String },
  active: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
