import express from "express";
import sendPhoto from "../../controllers/boards-controller/sendImage.js";
import upload from "../../middleware/upload.js";

const boardsRouter = express.Router();
boardsRouter.patch("/",upload.array("images",15), sendPhoto);

export default boardsRouter;
