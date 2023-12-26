const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password "],
    minLength: 8,
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords are not the same",
    },
  },

  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },

  role: { type: String },

  photo: { type: String },

  active: { type: Boolean, default: true },

  passwordLastChanged: { type: Date },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordLastChanged = Date.now();
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
