import type { NextFunction, Request, Response } from "express";
import * as factoryController from "./factoryController.js";

import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getUsers = factoryController.getAll(User);
export const createUser = factoryController.createOne(User);
export const deleteUser = factoryController.deleteOne(User);

export const updateMe = catchAsync(async (req: Request, res: Response) => {
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
  };

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});
