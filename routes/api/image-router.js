import express from "express";

import { authenticate, isValidParamImg } from "../../middleware/index.js";
import {
  addImages,
  addAvatarsImg,
  getImagesParam,
  getAllImages,
  deleteImages
} from "../../controllers/images-controler/index.js";
import upload from "../../middleware/upload.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";


const imagesRouter = express.Router();

imagesRouter.use(authenticate);
imagesRouter.get("/", ctrlWrapper(getAllImages));
imagesRouter.get("/:serialNumber/:device/:X", isValidParamImg, ctrlWrapper(getImagesParam));
imagesRouter.get("/:serialNumber/:device", isValidParamImg, ctrlWrapper(getImagesParam));
imagesRouter.get("/:serialNumber", isValidParamImg, ctrlWrapper(getImagesParam));
imagesRouter.post("/", upload.array("images", 15), ctrlWrapper(addImages));
imagesRouter.post("/avatarsImg", upload.array("images", 3), ctrlWrapper(addAvatarsImg));
imagesRouter.delete("/", ctrlWrapper(deleteImages));
imagesRouter.delete("/:id", ctrlWrapper(deleteImages));

export default imagesRouter;
