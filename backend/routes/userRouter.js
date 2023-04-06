import express from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/").get(protect, allUsers);
userRouter.route("/").post(registerUser);
userRouter.post("/login", authUser);

export default userRouter;
