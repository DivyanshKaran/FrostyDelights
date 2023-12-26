const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.signUp = asyncHandler(async (req, res, next) => {
  // Create A new User in the database
  const newUser = await User.create({
    name: req.body.name,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
    role: req.body.role,
  });

  // Create A new token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });

  // Built the cookie options
  const cookieOptions = {
    expires: new Date() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60,
    httpOnly: true,
  };

  // If production add secure options to the cookieOptions
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // send and build the cookie in the client brower
  res.cookie("jwt", token, cookieOptions);

  // Before sending the user object as the response intialize the password as undefines
  newUser.password = undefined;

  // Send the response
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return next(new AppError(400, "please provide email and password"));
  }
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !user.correctPassword(password, user.password)) {
    return next(new AppError(401, "Incorrect Email or Password"));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });

  const cookieOptions = {
    expires: process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "devlopment") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token,
  });
});
