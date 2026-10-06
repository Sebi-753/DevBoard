import type { Model } from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import type { NextFunction, Request, Response } from "express";

export const getAll = <T>(Model: Model<T>) => {
  return catchAsync(async (req, res, next) => {
    const documents = await Model.find();

    res.status(200).json({
      status: "success",
      results: documents.length,
      data: documents,
    });
  });
};
export const getOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(new Error("No document found with that ID"));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: document,
      },
    });
  });
export const createOne = <T>(Model: Model<T>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.create(req.body);

    if (!document) {
      return next(new Error("No document found with that ID"));
    }

    res.status(201).json({
      status: "success",
      data: {
        document,
      },
    });
  });
};
export const deleteOne = <T>(Model: Model<T>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new Error("No document found with that ID"));
    }

    res.status(204).json({
      status: "success",
    });
  });
};
