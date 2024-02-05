import express from "express";
import sendPhoto from "../../controllers/boards-controller/sendImage.js";
import upload from "../../middleware/upload.js";
import {isEmptyBody,isValidId} from "../../middleware/index.js";
import {addBoard, getAllBoards,getByIdBoard,updateBoard,removeBoard}from "../../controllers/boards-controller/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import { dashboarUpdateSchema, dashboardAddSchema } from "../../models/Board.js";
import authenticate from "../../middleware/authenticate.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const boardsRouter = express.Router();
boardsRouter.use(authenticate);
boardsRouter.get("/uploadimg",upload.array("images",45), ctrlWrapper(sendPhoto));
boardsRouter.get("/", ctrlWrapper(getAllBoards));
boardsRouter.get("/:id",isValidId, ctrlWrapper(getByIdBoard));
boardsRouter.post("/",isEmptyBody,validateBody(dashboardAddSchema), ctrlWrapper(addBoard));
boardsRouter.put(
    "/:id",
    isValidId,
    isEmptyBody,
    validateBody(dashboarUpdateSchema),
    updateBoard
  );
  boardsRouter.delete("/:id", isValidId, ctrlWrapper(removeBoard));

export default boardsRouter;
