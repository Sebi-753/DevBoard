import express from "express";

import * as taskController from "../controllers/taskController.js";
import * as projectController from "../controllers/projectController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/:id/tasks")
  .get(projectController.canAccessProject, taskController.getTasks)
  .post(
    authController.restrictTo("freelancer"),
    projectController.ownsProject,
    taskController.createTask,
  );

router
  .route("/")
  .get(projectController.getProjects)
  .post(
    authController.restrictTo("freelancer"),
    projectController.createProject,
  );

router
  .route("/:id")
  .get(projectController.canAccessProject, projectController.getProject)
  .delete(projectController.ownsProject, projectController.deleteProject)
  .patch(projectController.ownsProject, projectController.updateProject);

export default router;
