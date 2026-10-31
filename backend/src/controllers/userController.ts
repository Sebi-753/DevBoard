import type { NextFunction, Request, Response } from "express";
import * as factoryController from "./factoryController.js";

import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const getUsers = factoryController.getAll(User);
export const createUser = factoryController.createOne(User);
// export const deleteUser = factoryController.deleteOne(User);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(204).send();
  },
);

export const updateMe = catchAsync(async (req: Request, res: Response) => {
  const allowedFields = [
    "name",
    "email",
    "photo",
    "location",
    "bio",
    "skills",
    "availability",
  ];

  const filteredBody: Record<string, unknown> = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      filteredBody[field] = req.body[field];
    }
  }

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
    user: updatedUser,
  });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});
