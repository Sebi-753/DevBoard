import express from "express";

import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

//protect all routes

router.use(authController.protect);

router.route("/me").get(userController.getMe);
router.patch("/updateMyPassword", authController.updateMyPassword);

router
  .route("/clients")
  .get(authController.restrictTo("freelancer"), userController.getUserClients);

router.route("/getClients").get(userController.getClients);

router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getMe)
  .delete(userController.deleteUser)
  .patch(userController.updateMe);

export default router;
