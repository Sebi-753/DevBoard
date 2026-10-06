import type { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel.js";
import catchAsync from "../utils/catchAsync.js";
import * as factoryController from "./factoryController.js";
import AppError from "../utils/AppError.js";

export const getProject = factoryController.getOne(Project);
export const deleteProject = factoryController.deleteOne(Project);
export const createProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("You are not logged in", 401));
    }

    const { name, description, client, buget, deadline, coverImage } = req.body;
    const owner = req.user?._id;
    const createdProject = {
      name,
      description,
      client,
      owner,
      buget,
      deadline,
      coverImage,
    };

    const project = await Project.create(createdProject);

    res.status(201).json({
      status: "success",
      data: {
        project,
      },
    });
  },
);

export const getProjects = catchAsync(async (req, res) => {
  let filter = {};

  if (req.user?.role === "freelancer") {
    filter = { owner: req.user._id };
  }

  if (req.user?.role === "client") {
    filter = { client: req.user._id };
  }

  const projects = await Project.find(filter);

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: {
      projects,
    },
  });
});

export const updateProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filteredBody = {
      name: req.body.name,
      description: req.body.description,
      client: req.body.client,
      budget: req.body.budget,
      deadline: req.body.deadline,
      status: req.body.status,
      coverImage: req.body.coverImage,
    };

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProject) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        project: updatedProject,
      },
    });
  },
);

export const ownsProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    if (!projectId) next(new Error("This project does not exist!"));

    const project = await Project.findById(projectId).select("owner");
    const owner = project?.owner;

    if (!req.user) {
      return next(new AppError("You are not loggedIn", 401));
    }
    if (!owner?.equals(req.user._id)) {
      return next(
        new AppError("You are not authorized to access this project!", 403),
      );
    }
    next();
  },
);

export const canAccessProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;

    const project = await Project.findById(projectId).select("client owner");

    if (!project) {
      return next(new AppError("Project not found", 404));
    }
    const { client, owner } = project;

    if (!req.user) {
      return next(new AppError("You are not loggedIn", 401));
    }

    if (!owner?.equals(req.user._id) && !client?.equals(req.user._id)) {
      return next(
        new AppError("You do not have permision to access this project!", 403),
      );
    }
    next();
  },
);
