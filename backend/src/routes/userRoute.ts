import express from "express";

import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

//protect all routes

router.route("/me").get(authController.protect, userController.getMe);
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUsers,
  )
  .post(userController.createUser);

router.use(authController.protect);
router
  .route("/:id")
  .get(userController.getMe)
  .delete(userController.deleteUser)
  .patch(authController.protect, userController.updateMe);

export default router;
