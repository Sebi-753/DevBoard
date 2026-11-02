import type { NextFunction, Request, Response } from "express";
import * as factoryController from "./factoryController.js";

import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import Project from "../models/projectModel.js";

export const getUsers = factoryController.getAll(User);
export const createUser = factoryController.createOne(User);

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
    "birthDate",
    "phone",
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

export const getUserClients = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("You are not logged in", 401));
    }

    // Get all projects belonging to the freelancer
    const projects = await Project.find({
      owner: req.user._id,
    }).select("name client");

    // Get unique client IDs
    const clientsIds = [
      ...new Set(projects.map((project) => project.client.toString())),
    ];

    // Get client information
    const clients = await User.find({
      _id: { $in: clientsIds },
    }).select("name email photo location phone");

    // Attach projects to their respective clients
    const clientsWithProjects = clients.map((client) => {
      const clientProjects = projects
        .filter(
          (project) => project.client.toString() === client._id.toString(),
        )
        .map((project) => ({
          _id: project._id,
          name: project.name,
        }));

      return {
        ...client.toObject(),
        projects: clientProjects,
      };
    });

    res.status(200).json({
      status: "success",
      results: clientsWithProjects.length,
      data: {
        clients: clientsWithProjects,
      },
    });
  },
);
