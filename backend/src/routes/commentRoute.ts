import express from "express";

import * as commentController from "../controllers/commentController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(authController.restrictTo("admin"), commentController.getComments);

router
  .route("/:id")
  .delete(commentController.canDeleteComment, commentController.deleteComment);

export default router;
