import express from "express";

import * as taskController from "../controllers/taskController.js";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router
  .route("/:projectId/tasks")
  .get(taskController.getTasks)
  .post(taskController.createTask);

router
  .route("/")
  .get(projectController.getProjects)
  .post(projectController.createProject);
router
  .route("/:id")
  .get(projectController.getProject)
  .delete(projectController.deleteProject);

export default router;
