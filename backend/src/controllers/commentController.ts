import type { NextFunction, Request, Response } from "express";

import Comment from "../models/commentModel.js";

import * as factoryController from "./factoryController.js";
import catchAsync from "../utils/catchAsync.js";
import Task from "../models/taskModel.js";
import AppError from "../utils/AppError.js";
import Project from "../models/projectModel.js";

export const deleteComment = factoryController.deleteOne(Comment);
export const getComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("You are not logged in", 401));
    }
    if (req.user.role !== "admin") {
      return next(
        new AppError("You are not authorized to perform this action", 403),
      );
    }

    const comments = await Comment.find();

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  },
);
export const getTaskComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("You are not logged in", 401));
    }

    const taskId = req.params.id as string;

    const comments = await Comment.find({ task: taskId });

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  },
);

export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = req.params.id as string;

    const { text } = req.body;

    if (!req.user) {
      return next(new AppError("You are not logged in!", 401));
    }

    const createdComment = { task, text, author: req.user._id };

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

export const canDeleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("You are not logged in", 401));
    }

    const commentId = req.params.id as string;

    //get comment
    const comment = await Comment.findById(commentId).select("author");
    if (!comment) {
      return next(new AppError("Invalid comment", 400));
    }

    if (!comment.author) {
      return next(new AppError("Invalid comment", 400));
    }

    const { author } = comment;

    //admin can delete any comment
    if (req.user.role === "admin") {
      return next();
    }

    //a user can only delete a comment written by himself
    if (!author.equals(req.user.id)) {
      return next(
        new AppError("You do not have permission to delete this comment", 403),
      );
    }

    next();
  },
);
