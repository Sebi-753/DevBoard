import express from "express";

import * as taskController from "../controllers/taskController.js";
import * as commentController from "../controllers/commentController.js";

const router = express.Router();

router.route("/:id").delete(taskController.deleteTask);

//comments
router
  .route("/:taskId/comments")
  .get(commentController.getComments)
  .post(commentController.createComment);

export default router;
