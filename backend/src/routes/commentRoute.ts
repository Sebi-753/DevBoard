import express from "express";

import * as commentController from "../controllers/commentController.js";
import * as authController from "../controllers/authController.js";
import * as taskController from "../controllers/taskController.js";

const router = express.Router();

router.use(authController.protect);

router.route("/").get(commentController.getComments);

router
  .route("/:id")
  .delete(commentController.canAccessComment, commentController.deleteComment);

export default router;
