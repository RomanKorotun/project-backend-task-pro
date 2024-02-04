import express from "express";
import isEmptyBody from "../../middleware/isEmptyBody.js";
import userRegister from "../../controllers/auth-controller/register.js";
import isValidId from "../../middleware/isValidId.js";
import { userLogSchema, userRegisterSchema } from "../../models/User.js";
import { validateBody } from "../../decorators/validateBody.js";
import userSigIn from "../../controllers/auth-controller/signin.js";
import logOut from "../../controllers/auth-controller/logout.js";
import authenticate from "../../middleware/authenticate.js";
import currentUser from "../../controllers/auth-controller/current.js";
import updateUser from "../../controllers/auth-controller/updateUser.js";
//import upDateAvatar from "../../controllers/auth-controller/updateAvatar.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userRegisterSchema),
  userRegister
);

authRouter.post("/signin", isEmptyBody, validateBody(userLogSchema), userSigIn);

authRouter.post("/logout", authenticate, logOut);

authRouter.get("/current", authenticate, currentUser);

authRouter.put("/", authenticate, updateUser);

//authRouter.patch("/avatars", authenticate, upDateAvatar);

// authRouter.patch("/theme");

export default authRouter;
