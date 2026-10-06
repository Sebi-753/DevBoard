import type { NextFunction, Request, Response } from "express";

import Comment from "../models/commentModel.js";

import * as factoryController from "./factoryController.js";
import catchAsync from "../utils/catchAsync.js";
import Task from "../models/taskModel.js";
import AppError from "../utils/AppError.js";
import Project from "../models/projectModel.js";

export const getComments = factoryController.getAll(Comment);
export const deleteComment = factoryController.deleteOne(Comment);

export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = req.params.id as string;

    const text: string = req.body?.text;

    if (!req.user) {
      return next(new AppError("You are not logged in!", 401));
    }

    const author = req.user._id;

    const createdComment = { task, text, author };

    const comment = await Comment.create(createdComment);

    res.status(201).json({
      status: "success",
      data: comment,
    });
  },
);

export const canAccessComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId).select("task");

    if (!comment) {
      return next(new AppError("Comment not found", 404));
    }

    const taskId = comment.task;

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
