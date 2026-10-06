import * as factoryController from "./factoryController.js";
import Task from "../models/taskModel.js";

import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import Project from "../models/projectModel.js";
import AppError from "../utils/AppError.js";

export const getTasks = factoryController.getAll(Task);
export const getTask = factoryController.getOne(Task);
export const deleteTask = factoryController.deleteOne(Task);

export const createTask = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;

  if (!projectId) {
    return next(new AppError("Project ID is required", 400));
  }

  const task = await Task.create({
    ...req.body,
    project: projectId,
  });

  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
});

export const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filteredBody = {
      title: req.body.title,
      description: req.body.description,
      project: req.body.project,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      status: req.body.status,
      priority: req.body.priority,
    };

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task: updatedTask,
      },
    });
  },
);

export const canAccessProjectTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;

    const task = await Task.findById(taskId).select("project");

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    const projectId = task.project;

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
export const canModifyTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id).select("project");

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    const project = await Project.findById(task.project).select("owner");

    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    if (!req.user) {
      return next(new AppError("You are not logged in", 401));
    }

    if (!project.owner?.equals(req.user._id)) {
      return next(
        new AppError("You are not authorized to modify this task", 403),
      );
    }

    next();
  },
);
