import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.route("/deleteMe").delete(userController.deleteUser);
router.route("/updateMe").patch(userController.updateUser);

router.route("/").get(userController.getUsers).post(userController.createUser);

export default router;
