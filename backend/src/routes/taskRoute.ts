import express from "express";

import * as taskController from "../controllers/taskController.js";
import * as commentController from "../controllers/commentController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);
router.route("/").get(taskController.getUsersTasks);

//A user must have access to the project to perform any kind of action
//comments /// :id === taskId
router
  .route("/:id/comments")
  .get(taskController.canAccessProjectTasks, commentController.getTaskComments)
  .post(taskController.canAccessProjectTasks, commentController.createComment);

// Actions that only the freelancer can perform

router
  .route("/:id")
  .delete(
    authController.restrictTo("freelancer"),
    taskController.canModifyTask,
    taskController.deleteTask,
  )
  .patch(
    authController.restrictTo("freelancer"),
    taskController.canModifyTask,
    taskController.updateTask,
  )
  .get(
    taskController.canAccessProjectTasks,
    authController.restrictTo("freelancer"),
    taskController.getTask,
  );

export default router;
