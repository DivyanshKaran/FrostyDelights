const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.find();
    if (!docs)
      return next(
        new AppError(404, "There are no documents attached to this model")
      );

    res.status(200).json({
      status: "Success",
      data: {
        docs,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = await Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc)
      return next(new AppError(404, "There are no documents with that id"));

    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc)
      return next(
        new AppError(404, "Could not find any document with that id")
      );

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return next(new AppError(404, "Could not find document with that id"));

    res.status(204).json({
      status: "Success",
      message: "Succesfully deleted",
    });
  });
