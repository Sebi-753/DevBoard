import express from "express";

import * as taskController from "../controllers/taskController.js";
import * as commentController from "../controllers/commentController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);

//A user must have access to the project to perform any kind of action
//comments /// :id === taskId
router
  .route("/:id/comments")
  .get(taskController.canAccessProjectTasks, commentController.getComments)
  .post(taskController.canAccessProjectTasks, commentController.createComment);

// Actions that only the freelancer can perform
router.use(authController.restrictTo("freelancer"));

router
  .route("/:id")
  .delete(taskController.canModifyTask, taskController.deleteTask)
  .patch(taskController.canModifyTask, taskController.updateTask);

export default router;
