import Project from "../models/projectModel.js";
import * as factoryController from "./factoryController.js";

export const getProjects = factoryController.getAll(Project);
export const getProject = factoryController.getOne(Project);
export const deleteProject = factoryController.deleteOne(Project);
export const createProject = factoryController.createOne(Project);
