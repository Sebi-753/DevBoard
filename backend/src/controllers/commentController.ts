import * as factoryController from "./factoryController.js";
import Comment from "../models/commentModel.js";

export const getComments = factoryController.getAll(Comment);
export const deleteComment = factoryController.deleteOne(Comment);
export const createComment = factoryController.createOne(Comment);
