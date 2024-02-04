import express from "express";

import sendHelpMail from "../../controllers/help-controller/index.js";
import { isEmptyBody } from "../../middleware/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import helpMailSchema from "../../models/helpMail.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const helpRouter = express.Router();

helpRouter.post(
  "/",
  isEmptyBody,
  validateBody(helpMailSchema),
  ctrlWrapper(sendHelpMail)
);

export default helpRouter;
