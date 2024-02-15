import express from "express";
import isEmptyBody from "../../middleware/isEmptyBody.js";
import {
  userLogSchema,
  userRegisterSchema,
  userUpdateSchema,
} from "../../models/User.js";
import { validateBody } from "../../decorators/validateBody.js";
import userSigIn from "../../controllers/auth-controller/signin.js";
import logOut from "../../controllers/auth-controller/logout.js";
import authenticate from "../../middleware/authenticate.js";
import currentUser from "../../controllers/auth-controller/current.js";
import updateUser from "../../controllers/auth-controller/updateUser.js";
import upload from "../../middleware/upload.js";
import updateTheme from "../../controllers/auth-controller/updateTheme.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import signUp from "../../controllers/auth-controller/register.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userRegisterSchema),
  ctrlWrapper(signUp)
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userLogSchema),
  ctrlWrapper(userSigIn)
);

authRouter.post("/logout", authenticate, ctrlWrapper(logOut));

authRouter.get("/current", authenticate, ctrlWrapper(currentUser));

authRouter.put(
  "/users",
  authenticate,
  upload.single("avatar"),
  validateBody(userUpdateSchema),
  ctrlWrapper(updateUser)
);

authRouter.patch("/theme", authenticate, isEmptyBody, ctrlWrapper(updateTheme));

export default authRouter;
