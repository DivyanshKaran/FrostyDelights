const IceCream = require("../models/icecreamModel");
const AppError = require("../utils/appError");
const asyncHandler = require("express-async-handler");
const factory = require("../controllers/handlerFactory");

exports.getAllIceCreams = factory.getAll(IceCream);

exports.getIceCream = factory.getOne(IceCream);

exports.createIceCream = factory.createOne(IceCream);

exports.updateIceCream = factory.updateOne(IceCream);

exports.deleteIceCream = factory.deleteOne(IceCream);
