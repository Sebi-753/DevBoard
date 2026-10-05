import * as factoryController from "./factoryController.js";
import Task from "../models/taskModel.js";

export const getTasks = factoryController.getAll(Task);
export const getTask = factoryController.getOne(Task);
export const deleteTask = factoryController.deleteOne(Task);
export const createTask = factoryController.createOne(Task);
