import express from "express";

import { authenticate, isValidParamImg } from "../../middleware/index.js";
import {
  addImages,
  getImagesParam,
  getAllImages,
} from "../../controllers/images-controler/index.js";
import upload from "../../middleware/upload.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { deleteImages } from "../../controllers/images-controler/index.js";

const imagesRouter = express.Router();

//imagesRouter.use(authenticate);
imagesRouter.get("/", ctrlWrapper(getAllImages));
imagesRouter.get("/:device/:X", isValidParamImg, ctrlWrapper(getImagesParam));
imagesRouter.post("/", upload.array("images", 15), ctrlWrapper(addImages));
imagesRouter.delete("/", ctrlWrapper(deleteImages));

export default imagesRouter;