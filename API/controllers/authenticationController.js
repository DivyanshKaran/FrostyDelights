const { promisify } = require("util");
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
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Built the cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
    ),
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

  if (
    !user ||
    !(await User.schema.methods.correctPassword(password, user.password))
  ) {
    return next(new AppError(401, "Incorrect Email or Password"));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token = " ";
  // console.log(req.cookies.jwt);
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // } else
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError(401, "You are not Logged in. Please login to get access")
    );
  }
  // console.log(process.env.JWT_SECRET);
  // console.log(token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);
  const currentUser = await User.findById(decoded.id);
  // console.log(currentUser);
  if (!currentUser) {
    return next(
      new AppError(401, "The User Belonging to the the token does not exist")
    );
  }

  req.user = currentUser;
  next();
});

exports.restrictsto = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "You do not have permission to perform this action")
      );
    }
    next();
  };
};
