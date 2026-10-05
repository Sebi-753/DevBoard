import type { NextFunction, Request, Response } from "express";
import * as factoryController from "./factoryController.js";

import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getUsers = factoryController.getAll(User);
export const createUser = factoryController.createOne(User);
export const deleteUser = factoryController.deleteOne(User);
export const updateUser = (req: Request, res: Response) => {};
