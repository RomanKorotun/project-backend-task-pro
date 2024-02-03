import express from "express";
import isEmptyBody from "../../middleware/isEmptyBody.js";
import userRegister from "../../controllers/auth-controller/register.js";
import isValidId from "../../middleware/isValidId.js";
import { userLogSchema, userRegisterSchema } from "../../models/User.js";
import { validateBody } from "../../decorators/validateBody.js";
import userSigIn from "../../controllers/auth-controller/signin.js";
import logOut from "../../controllers/auth-controller/logout.js";
import authenticate from "../../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userRegisterSchema),
  userRegister
);

authRouter.post("/signin", validateBody(userLogSchema), userSigIn);

authRouter.post("/logout", authenticate, logOut);

// authRouter.get("/current", authControllers.userCurrent);

// authRouter.put("/", authControllers.userUpdate);

// authRouter.patch("/avatars", authControllers.userUpdateAvatar);

// authRouter.patch("/themes");

export default authRouter;
