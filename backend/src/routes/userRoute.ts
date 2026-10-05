import express from "express";

import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.route("/me").get(authController.protect, userController.getMe);

router.route("/deleteMe").delete(userController.deleteUser);
router.route("/updateMe").patch(userController.updateUser);

router.route("/").get(userController.getUsers).post(userController.createUser);

export default router;
